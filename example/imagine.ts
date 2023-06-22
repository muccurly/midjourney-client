import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of how to use the imagine command
 * ```
 * npx tsx example/imagine.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    ApplicationId: <string>"1090660574196674713",
    Debug: true,
  });
  // const msg = await client.Describe(
  //   "https://media.discordapp.net/attachments/1110688357954109513/1120549554513788969/8f98cc1a-2f06-40ea-ae27-ac2025a08700.png?width=475&height=634"
  // );
  const msg = await client.SaveId(
    "1",
    "https://media.discordapp.net/attachments/1110688357954109513/1120549554513788969/8f98cc1a-2f06-40ea-ae27-ac2025a08700.png"
  );
  console.log(JSON.stringify(msg));
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
