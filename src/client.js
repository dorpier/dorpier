import { createMessage, logger, sendLocalMessage } from "./utils/index.js";
import { default as webpack } from "./webpack/api.js";
import modules from "./webpack/modules.js";
import { default as patcher } from "./patcher.js";

export class Client {
    constructor() {
        this.events = {};
        this._connected = false;
    }

    get connected() {
        return this._connected;
    }

    connect() {
        patcher.after(
            modules.socket,
            "_handleDispatchWithoutQueueing",
            async function (args, _) {
                await this.emit(args[1].toLowerCase(), args[0]);
            }.bind(this),
            "__dorpier_internal_client_hook",
        );
        this._connected = true;
        logger.info("Successfully hooked into the client!");
    }

    disconnect() {
        patcher.unpatch(
            modules.socket,
            "_handleDispatchWithoutQueueing",
            "__dorpier_internal_client_hook",
        );
        this._connected = false;
        logger.info("Successfully unhooked from the client!");
    }

    on(event, callback, raw = false) {
        if (raw) {
            if (this.events[event] === undefined) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
            return () =>
                this.events[event].splice(
                    this.events[event].indexOf(callback),
                    1,
                );
        } else {
            const wrapper = async function (event) {
                if (this._connected) await callback(event);
            }.bind(this);

            modules.dispatcher.subscribe(event.toUpperCase(), wrapper);
            return () =>
                modules.dispatcher.unsubscribe(event.toUpperCase(), wrapper);
        }
    }

    async emit(event, data) {
        if (this.events[event] === undefined) {
            return;
        }
        for (let callback of this.events[event]) {
            try {
                await callback(data);
            } catch (e) {
                logger.error(`Error in '${event}', callback: '${e}'`);
            }
        }
    }

    get sessionID() {
        return webpack.getModule("getSessionId").getSessionId();
    }

    get fingerprint() {
        return webpack.getModule("getFingerprint").getFingerprint();
    }

    get user() {
        return webpack.getModule("getCurrentUser").getCurrentUser();
    }

    get guilds() {
        return webpack.getModule("getGuild", "getGuilds").getGuilds();
    }

    get guildFolders() {
        return webpack.getModule("getSortedGuilds").getSortedGuilds();
    }

    get privateChannels() {
        return webpack
            .getModule("getMutablePrivateChannels")
            .getSortedPrivateChannels();
    }

    getGuild(id) {
        return webpack.getModule("getGuild", "getGuilds").getGuild(id);
    }

    joinGuild(id, lurking = false) {
        return webpack.getModule("joinGuild").joinGuild(id, {
            lurker: lurking,
        });
    }

    getGuildChannels(guildID) {
        return Object.values(
            webpack
                .getModule("getMutableGuildChannelsForGuild")
                .getMutableGuildChannelsForGuild(guildID),
        );
    }

    getChannel(id) {
        return webpack.getModule("hasChannel").getChannel(id);
    }

    getChannelThreads(channelID) {
        return webpack
            .getModule("getAllThreadsForParent")
            .getAllThreadsForParent(channelID);
    }

    createDM(...id) {
        return webpack
            .getModule("openPrivateChannel")
            .openPrivateChannel(id)
            .then((channel) => this.getChannel(channel));
    }

    getUser(id) {
        return webpack.getModule("getUser").getUser(id);
    }

    getGuildMember(guildID, id) {
        return webpack.getModule("getMember").getMember(guildID, id);
    }

    getGuildMembers(guildID) {
        return webpack.getModule("getMembers").getMembers(guildID);
    }

    requestGuildMembers(
        ids,
        { query = "", limit = 10, presences = true, userIDs = [] },
    ) {
        if (userIDs) {
            return webpack
                .getModule("requestMembers")
                .requestMembersById(ids, userIDs, presences);
        } else {
            return webpack
                .getModule("requestMembers")
                .requestMembers(ids, query, limit, presences);
        }
    }

    getChannelMessages(channelID) {
        return webpack.getModule("getMessages").getMessages(channelID);
    }

    sendMessage(
        channel,
        content = "",
        {
            tts = false,
            messageReference = null,
            allowedMentions = null,
            stickerIDs = null,
        },
    ) {
        if (!content && !stickerIDs) {
            throw new TypeError("Must provide either content or stickerIDs");
        }
        if (!channel) {
            throw new TypeError("Must provide a channel ID");
        }
        let msg = {
            content: content,
            tts: tts,
            invalidEmojis: [],
            validNonShortcutEmojis: [],
        };
        let params = {};
        if (messageReference != null) {
            params.messageReference = messageReference;
        }
        if (allowedMentions != null) {
            params.allowedMentions = allowedMentions;
        }
        if (stickerIDs != null) {
            params.stickerIds = stickerIDs;
        }
        return webpack
            .getModule("sendMessage")
            .sendMessage(channel, msg, null, params);
    }

    sendEphemeralMessage(
        channel,
        content = "",
        embeds,
        {
            author,
            type = 0,
            tts = false,
            stickerIDs = [],
            messageReference,
            allowedMentions,
        },
    ) {
        let msg = createMessage(channel, content, embeds);
        msg.author = author || this.user;
        msg.type = type;
        msg.tts = tts;
        msg.sticker_ids = stickerIDs;
        msg.message_reference = messageReference;
        msg.allowed_mentions = allowedMentions;
        return sendLocalMessage(msg.channel_id, msg);
    }

    sendClydeMessage(channel, content, embeds) {
        return webpack
            .getModule("sendBotMessage")
            .sendBotMessage(channel, content, embeds);
    }

    sendClydeError(channel) {
        return webpack.getModule("sendBotMessage").sendClydeError(channel);
    }

    acceptInvite(invite, transition = true) {
        invite = invite.replace(
            /(https?:\/\/)?(www\.)?(discord\.gg|discordapp\.com\/invite|discord\.com\/invite)\/?/,
            "",
        );
        const module = webpack.getModule("acceptInvite");
        return (
            transition
                ? module.acceptInviteAndTransitionToInviteChannel
                : module.acceptInvite
        )({ inviteKey: invite });
    }
}
