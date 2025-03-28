import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../declarations/de-complain-backend";
import { canisterId } from "../../declarations/de-complain-backend";

const agent = new HttpAgent({
  host: "http://localhost:4943", // Change this for mainnet
});

export const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});
