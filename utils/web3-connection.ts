import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";

const PRIVATE_KEY = new Uint8Array(bs58.decode(process.env.SECRET ?? ""));
const mainWallet = Keypair.fromSecretKey(PRIVATE_KEY);

export const web3Connetion = new Connection(
  clusterApiUrl("devnet"),
  "confirmed"
);

export const createAndTransferCrytpo = async (
  receiverAddress: string
): Promise<{
  type: "success" | "failed";
  res: string;
}> => {
  try {
    try {
      new PublicKey(receiverAddress); // Throws an error if invalid
    } catch (err) {
      throw new Error("Invalid receiver address.");
    }
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: mainWallet.publicKey,
        toPubkey: new PublicKey(receiverAddress),
        lamports: LAMPORTS_PER_SOL * 0.01,
      })
    );

    const signature = await sendAndConfirmTransaction(
      web3Connetion,
      transaction,
      [mainWallet]
    );

    return {
      type: "success",
      res: signature,
    };
  } catch (error) {
    return {
      type: "failed",
      res: "Failed to make transaction check public key",
    };
  }
};
