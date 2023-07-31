import { RequestContextService } from "../application/context/request-context.service";
import {v4} from 'uuid';

type CommandMetadata = {
    readonly correlationId : string;

    readonly causationId ?: string;

    readonly userId ?: string;

    readonly timestamp : number;
}

export class Command {
    readonly id : string;
    readonly metadata : CommandMetadata;
    constructor(props:CommandProps<unknown>){
        const ctx = RequestContextService.getContext();
        this.id = props.id || v4();
        this.metadata = {
            correlationId : props?.metadata?.correlationId || ctx.requestId,
            timestamp : props.metadata?.timestamp || Date.now(),
            causationId : props.metadata?.causationId,
            userId : props.metadata?.userId
        }
    }
}

export type CommandProps<T> = Omit<T,'id'|'metadata'> & Partial<Command>;   