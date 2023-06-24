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
    Ws: true,
  });
  // const msg = await client.Describe(
  //   "https://media.discordapp.net/attachments/1110688357954109513/1120549554513788969/8f98cc1a-2f06-40ea-ae27-ac2025a08700.png?width=475&height=634"
  // );
  await client.Connect();
  const msg = await client.SwapFace(
    "1", 
    "https://media.discordapp.net/attachments/1110688357954109513/1120560465702031481/portrait_of_man_in_kazakh_warrior_in_the_style_of_golden__be193c19-b284-4b5c-a19a-42e1a1fe4d60.png"
  );
  client.Close();
  console.log(JSON.stringify(msg));
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
