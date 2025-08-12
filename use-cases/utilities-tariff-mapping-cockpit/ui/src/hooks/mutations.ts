import useSWRMutation from "swr/mutation";
import { sendRequest } from "@/lib/api";
import { API_URL } from "@/lib/config";

interface ProcessDocumentPayload {
  text: string;
}

export function useProcessDocumentMutation() {
  return useSWRMutation(`${API_URL}/processDocument`, (url, { arg }: { arg: ProcessDocumentPayload }) => sendRequest(url, { arg }));
}
