export enum EmailReasonType {
    invalid_email = "invalid_email",
    invalid_domain = "invalid_domain",
    rejected_email = "rejected_email",
    accepted_email = "accepted_email",
    low_quality = "low_quality",
    low_deliverability = "low_deliverability", 
    no_connect = "no_connect",
    timeout = "timeout",
    invalid_smtp = "invalid_smtp",
    unavailable_smtp = "unavailable_smtp",
    unexpected_error = "unexpected_error"
}

export interface KickBoxResponse {
    data: KickBoxData;
}

export interface KickBoxData {
    result: string;
    reason: EmailReasonType;
    role: boolean;
    free: boolean;
    disposable: boolean;
    accept_all: boolean;
    did_you_mean: null | string;
    sendex: number;
    email: string;
    user: string;
    domain: string;
    success: boolean;
}