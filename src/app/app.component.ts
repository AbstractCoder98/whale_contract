import { Component, OnInit } from '@angular/core';
import {Connection, PublicKey} from '@solana/web3.js';
import * as borsh from 'borsh';
import { PlatformAccount, PlatformInfoSchema } from './schemas/plat-info-account';
import * as anchor from '@project-serum/anchor';
import { IDL } from 'sol_program/target/types/sol_program';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my_contract';

  public whales = [];
  public uri: string = "";
  public showUri = false;

  public program: any;

  ngOnInit() {
    const provider = anchor.Provider.local("https://api.devnet.solana.com");

    const idl_file = require('sol_program/target/idl/sol_program.json');
    // const idl = JSON.stringify(idl_file);

    const programID = new PublicKey(idl_file.metadata.address);

    // Configure the client to use the local cluster.
    anchor.setProvider(provider);

    this.program = new anchor.Program(IDL, programID, provider);
  }

  public async setUri(option: number) {

    const accountPubkey = new PublicKey("3KmpLfXxAxWgD3X8bNkqfWhc7FF9ySWucKSNjA3b6PKq");
    
    if (option === 1) {
      await this.program.rpc.setUri("https://api.testnet.solana.com", {
        accounts: {
          authority: accountPubkey,
        },
      },
      );
    }
    if (option === 2) {
      await this.program.rpc.setUri("https://api.testnet.solana.com", {
        accounts: {
          authority: accountPubkey,
        },
      },
      );
    }
  }

  public async getUri() {
    // New RPC copnnection
    const connection = new Connection("https://api.devnet.solana.com", 'confirmed');
    // Account were is being saved the data
    const platformPublickey = new PublicKey("3KmpLfXxAxWgD3X8bNkqfWhc7FF9ySWucKSNjA3b6PKq");

    const accountInfo = await connection.getAccountInfo(platformPublickey);

    if (accountInfo === null) {
      throw new Error('Error: cannot find the greeted account');
    }

    // Find the expected parameters.
    const platformInfo = borsh.deserialize(
      PlatformInfoSchema,
      PlatformAccount,
      accountInfo.data
    );

    // A little helper
    console.log("platformInfo: ", platformInfo);

    // Pass the counter to the client-side as JSON
    // res.status(200).json(undefined);
    
    this.showUri = true;
    this.uri = "";
  }

  public addWhale() {
    
  }

  public displayWhales() {
    
  }
}
