import { Actor, HttpAgent } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";

// Host determination function
const getHost = () => {
  return "http://127.0.0.1:4943"; // ✅ Force local development
};

const canisterId =
  process.env.CANISTER_ID_DE_COMPLAIN_BACKEND || "bkyz2-fmaaa-aaaaa-qaaaq-cai";

// Create IDL factory with robust type definitions
const idlFactory = ({ IDL }) => {
  const Comment = IDL.Record({
    user: IDL.Principal,
    text: IDL.Text,
  });

  const Complaint = IDL.Record({
    id: IDL.Text,
    title: IDL.Text,
    description: IDL.Text,
    category: IDL.Text,
    user: IDL.Principal,
    status: IDL.Text,
    upvotes: IDL.Nat,
    comments: IDL.Vec(Comment),
  });

  return IDL.Service({
    submit_complaint: IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Text], []),
    get_complaints: IDL.Func([], [IDL.Vec(Complaint)], ["query"]),
    upvote_complaint: IDL.Func([IDL.Text], [], ["oneway"]),
    add_comment: IDL.Func([IDL.Text, IDL.Text], [], ["oneway"]),
    update_complaint_status: IDL.Func([IDL.Text, IDL.Text], [], ["oneway"]),
  });
};

// Centralized actor creation function
export const createDeComplainActor = async () => {
  const host = getHost();

  // Create HttpAgent with additional configuration
  const agent = new HttpAgent({
    host,
    verify: false, // Disable certificate verification
  });

  // Fetch root key for local development
  if (process.env.DFX_NETWORK === "local") {
    agent.fetchRootKey().catch((err) => {
      console.warn("Unable to fetch root key. Check connection:", err);
    });
  }

  // Create actor directly
  try {
    const actor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });

    console.log("Actor created successfully:", actor);

    // Wrap actor methods to ensure initialization
    return {
      async submit_complaint(title, description, category) {
        return actor.submit_complaint(title, description, category);
      },
      async get_complaints() {
        return actor.get_complaints();
      },
      async upvote_complaint(complaintId) {
        return actor.upvote_complaint(complaintId);
      },
      async add_comment(complaintId, comment) {
        return actor.add_comment(complaintId, comment);
      },
      async update_complaint_status(complaintId, status) {
        return actor.update_complaint_status(complaintId, status);
      }
    };
  } catch (err) {
    console.error("Failed to create actor:", err);
    throw err;
  }
};

export default createDeComplainActor;