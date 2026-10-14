import bcrypt from "bcryptjs";
const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Usage: npm run hash-password -- "a passphrase of 10+ characters"');
  process.exit(1);
}
console.log("\nAdd this line to server/.env:\n");
console.log(`ADMIN_PASSWORD_HASH='${bcrypt.hashSync(password, 12)}'\n`);
