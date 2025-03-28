use candid::Nat;
use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Complaint {
    pub id: String,
    pub title: String,
    pub description: String,
    pub category: String,
    pub user: Principal,
    pub status: String,
    pub upvotes: Nat, // ✅ Ensure it's `Nat`, not `u64`
    pub comments: Vec<Comment>,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Comment {
    pub user: Principal,
    pub text: String,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct User {
    pub principal: Principal,
    pub complaints: Vec<String>, // Complaint IDs
}
