import { sessionCommon } from "../common/common";
import { sessionAuth } from "../..";
import { HttpMethod, httpClient, HttpRequest } from "@activepieces/pieces-common";
import { createAction } from "@activepieces/pieces-framework";
import dayjs from 'dayjs'

export const getTranscript = createAction({
    auth: sessionAuth,
    name: "get_transcript",
    displayName: "Get Transcript",
    description: "Get the transcript for the session.",
    props: {
    },
    async run({auth, store}) {
        const session = await latestSession(auth);
        const id = await store.get<string>('lastId');
        const dateOf = await store.get<string>('createdAt')
        if (!id){
            await store.put("lastSession", session['createdAt']);
            await store.put("lastId", session['id']);
            return "Session Data stored, please rerun";
        }

        if (dayjs(session.createdAt).isBefore(dayjs(dateOf))){
            return "Retest this step";
        }

        const request: HttpRequest = {
            method: HttpMethod.GET,
            url: `${sessionCommon.baseUrl}sessions/${session.id}/transcripts`,
            headers: {
                "accept":"application/json",
                "x-api-key":auth,
            }
        }
        return await httpClient.sendRequest(request);
    }
});

async function latestSession(auth: string){
    const sessions = (await httpClient.sendRequest({
        method: HttpMethod.GET,
        url: "https://api.app.sessions.us/api/sessions",
        headers: {
            "accept":"application/json",
            "x-api-key": `${auth}`
        }
    })).body;
    return {
        "id":sessions[0]["id"],
        "createdAt": sessions[0]["createdAt"],
    };
}