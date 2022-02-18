import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SolProgram } from '../target/types/sol_program';

describe('sol_program', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolProgram as Program<SolProgram>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
