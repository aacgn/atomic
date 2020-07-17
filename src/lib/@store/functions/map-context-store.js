import { CustomWindowVariable } from "../../@core/enums/custom-window-variable.enum";

export function mapContextStore(item = null) {	
    if (item)
        return window[CustomWindowVariable.ATOMIC_CONTEXT_STORE][item];
        
    return window[CustomWindowVariable.ATOMIC_CONTEXT_STORE];	
} 	
