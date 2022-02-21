use anchor_lang::prelude::*;
use borsh::{BorshDeserialize, BorshSerialize};
// use solana_program::{
//     account_info::{next_account_info, AccountInfo},
//     entrypoint,
//     entrypoint::ProgramResult,
//     msg,
//     program_error::ProgramError,
//     pubkey::Pubkey,
// };
use mpl_token_metadata::state::{Metadata};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod sol_program {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: String) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        my_account.uri = data;
        Ok(())
    }

    pub fn seturi(ctx: Context<MintPlatConfing>, data: String) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        my_account.uri = data;
        Ok(())
    }

    pub fn addwhale(ctx: Context<Whale>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    pub my_account: Account<'info, Uri>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintPlatConfing<'info> {
    my_account: Account<'info, Uri>,
}

#[account]
pub struct Uri{
    // address: Pubkey,
    uri: String
}

#[derive(Accounts)]
pub struct Whale<'info> {
    info: Account<'info, WhaleInfo>
}

#[account]
pub struct WhaleInfo {
    meta: Metadata,
}