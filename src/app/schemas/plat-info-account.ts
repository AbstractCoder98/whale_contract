// The state of a greeting account managed by the hello world program
export class PlatformAccount {
    uri = "";
    constructor(fields: {uri: string} | undefined = undefined) {
      if (fields) {
        this.uri = fields.uri;
      }
    }
  }
  
// Borsh schema definition for greeting accounts
export const PlatformInfoSchema = new Map([
    [PlatformAccount, {kind: 'struct', fields: [['counter', 'String']]}],
]);