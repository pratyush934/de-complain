use crate::types::{Comment, Complaint, User};
use candid::Principal;
use ic_cdk::api::caller;
use ic_cdk::storage;
use ic_cdk_macros::*;
use std::collections::HashMap;

mod types;

// Store complaints & users
type ComplaintStore = HashMap<String, Complaint>;
type UserStore = HashMap<Principal, User>;

// Initialize memory storage
#[init]
fn init() {
    storage::stable_save((
        HashMap::<String, Complaint>::new(),
        HashMap::<Principal, User>::new(),
    ))
    .unwrap();
}

#[update]
fn submit_complaint(title: String, description: String, category: String) -> String {
    let user = caller();
    let id = format!("{}", ic_cdk::api::time());

    let complaint = Complaint {
        id: id.clone(),
        title,
        description,
        category,
        user,
        status: "pending".to_string(),
        upvotes: 0,
        comments: Vec::new(),
    };

    let (mut complaints, mut users): (ComplaintStore, UserStore) =
        storage::stable_restore().unwrap();

    complaints.insert(id.clone(), complaint);
    users
        .entry(user)
        .or_insert(User {
            principal: user,
            complaints: Vec::new(),
        })
        .complaints
        .push(id.clone());

    storage::stable_save((complaints, users)).unwrap();
    id
}

#[query]
fn get_complaints() -> Vec<Complaint> {
    let (complaints, _): (ComplaintStore, UserStore) = storage::stable_restore().unwrap();
    complaints.values().cloned().collect()
}

#[update]
fn upvote_complaint(complaint_id: String) {
    let (mut complaints, users): (ComplaintStore, UserStore) = storage::stable_restore().unwrap();

    if let Some(complaint) = complaints.get_mut(&complaint_id) {
        complaint.upvotes += 1;
    }

    storage::stable_save((complaints, users)).unwrap();
}

#[update]
fn add_comment(complaint_id: String, text: String) {
    let user = caller();
    let (mut complaints, users): (ComplaintStore, UserStore) = storage::stable_restore().unwrap();

    if let Some(complaint) = complaints.get_mut(&complaint_id) {
        complaint.comments.push(Comment { user, text });
    }

    storage::stable_save((complaints, users)).unwrap();
}

#[update]
fn update_complaint_status(complaint_id: String, new_status: String) {
    let (mut complaints, users): (ComplaintStore, UserStore) = storage::stable_restore().unwrap();

    if let Some(complaint) = complaints.get_mut(&complaint_id) {
        complaint.status = new_status;
    }

    storage::stable_save((complaints, users)).unwrap();
}