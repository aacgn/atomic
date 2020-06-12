import { Storage } from "../../@core/enums/app-storage.enum";

export function mapGlobalContextStore() {
    return window[Storage.STORAGE_NAME];
}