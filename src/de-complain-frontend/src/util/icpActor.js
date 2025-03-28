import { Actor, HttpAgent } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";
import backendDidRaw from "declarations/de-complain-backend/de-complain-backend.did";

const canisterId =
  process.env.CANISTER_ID_DE_COMPLAIN_BACKEND || "bkyz2-fmaaa-aaaaa-qaaaq-cai";

// Check if running in development or production
const host =
  process.env.DFX_NETWORK === "local"
    ? "http://127.0.0.1:4943"
    : "https://mainnet.dfinity.network";

const agent = new HttpAgent({
  host: host,
});

// Only enable identity verification in production
if (process.env.DFX_NETWORK !== "local") {
  agent.fetchRootKey();
}

// Create IDL factory from raw Candid interface
const idlFactory = (({ IDL }) => {
  const Comment = IDL.Record({
    user: IDL.Principal,
    text: IDL.Text
  });

  const Complaint = IDL.Record({
    id: IDL.Text,
    title: IDL.Text,
    description: IDL.Text,
    category: IDL.Text,
    user: IDL.Principal,
    status: IDL.Text,
    upvotes: IDL.Nat,
    comments: IDL.Vec(Comment)
  });

  return IDL.Service({
    submit_complaint: IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    get_complaints: IDL.Func([], [IDL.Vec(Complaint)], ['query']),
    upvote_complaint: IDL.Func([IDL.Text], [], ['oneway']),
    add_comment: IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
    update_complaint_status: IDL.Func([IDL.Text, IDL.Text], [], ['oneway'])
  });
});

const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export { actor, idlFactory };