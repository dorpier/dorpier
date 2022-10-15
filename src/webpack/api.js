import { lazy } from "../utils/lazy.js";
import { getApi } from "./find.js";

export const webpack = lazy(getApi);

export default webpack;
