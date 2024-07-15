import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { join } from "path";

// const id = "aightnow-96848";
// const email = "firebase-adminsdk-na0sx@aightnow-96848.iam.gserviceaccount.com";
// const key =
//   "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDfkRzb6k+Ez8gv\niEGSZjbnUOjIq5zMG1ozkAQEIqFAVN1xvni4F3dgK+ECF8t1O9Msi94jtapBYF00\nE3Yy2zXqz6r+Ng8BPkAHZZi9DqFB7IegoleIbFTE+WBoTgA1STk78MAoyt6JxPRI\nYo7685HvjR4pVtt8iOyzWrKB6x7yMuwcKS3mNcyrp/ypmkqytFmWsurnD/HBTmbG\nH2955dR1GoTB0CH6iHMK9A26O+Z8A+F8yOgv5jSA4KW/0gfRbjFttBkaVcQ2NO3j\nPt5DmXGejSDopP1iQFnnZPbOr0KZD0hqehqHPvgyfyyM+IkF9gurmNlajv3XALtU\nQa0L0woVAgMBAAECggEAIsgcyUoG3Q7Ggj6clP46BHrd/HpWhpqqyeLZ/Rq2I6AQ\nY6XSejGMbPXmp8Cz8qVAEWohQUT+G/W2CmgMt5TLKqDsZWhbpUHeDEiOHrur8umt\noBwhqiPQfGSfzxpzhdbChMTL4IzPWne92ZUb0YcbaT13N88/jnxu9uhhZT0DL4La\nCW0RdBGo8abYVWHsUIu3ZgJrncvVZwWRIKdj+5fo9qKo2I2heEDdZwGtM8dYcSeH\nGwVFoBey1wYN2n0uOHrGJGcbhr7DSf2tL2RzOhzVkKrpIj/UNGm7kMPlIoMpqUJ5\nwOSHx8rblrcQ43zDIqAe8pTxxWhj2fIhAC43NtSYAQKBgQD/CtS2FAmlB2DLVDL2\nAX024K71WrKpPAD8II5arF9a6v8aT31vjDn5JVtyTWykR5D6eIdecruFsvBnny7z\nshnOqJbSGDEEP3q9DZgrjSCuBd5GOlrSVgCgVNXfou6kbvgWsuLlq1KW0s8VSU5N\ndjypnAxIxONg+MnchQYi1XsdgQKBgQDgaAZcRjFzyT4A6338WdbSuWJsp5hbbjqh\n1A2zaOVEpglZ5SePol8051Oa/J0jQmjaTFs7d++n6CDuEeXZBuZY8seCt/e0mJlF\nGEvxUVXsIg+5tcxEDJodI0taGSpEd+vu2HmP8T/BC6kSFATbQ1B+NtIN9u8r7KBz\nSi4ynBXelQKBgQDVVhYACFrY9Ib/Dfti1HQNB3zSN3/jGBIq1IC/UBijUJb7RyrB\nuCZ2Rc1sm18ZO9QF7/QsCQTbHYcC5qC7sGrt9w/RxfKafw8IPOrg4zhG2RnI3N9D\nujTj6JLOctf0K+7R7ejl/J0lFEmsoJkjKpgruCB+blNUtkcEczFiyfgmAQKBgQDe\n9vy62hNwk9dDWrhG74x+uyuMAcljrtYazHMAe4yw9Lf91a3FDPPDwMRVDgGjcuxz\nWcKcB8La9c0iPi49wJlGb5LD0r4Pdj9zY3yxPLs+b2lof7WBN3Q410SbNL3GYdDN\n89B0sKNDz64hBDr/EJb9kMKMlXl2Dxos8tuL9YHVMQKBgD5Y1zm0RW3Mn/dd7xxQ\naUoE2PvkZbaBLCjr3TIzPIGthaAFBRAe5VlgQjHjkmAXc01SeLh8mwJsWh/kwrui\nvIMRreWbPE8xQSZAtRKDCo+oc/rNXLY1Kbdo/G3LTjpUl/DKwQaq0bil7/YLFX+2\nh0X56hTpPWWeEMj63JmZPkYa\n-----END PRIVATE KEY-----\n";

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: id as string,
//       clientEmail: email as string,
//       privateKey: key!.replace(/\\n/g, "\n"),
//     }),
//   });
// }

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID as string,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
//     }),
//   });
// }

// const id = "test-29402";
// const key =
//   "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDytyuDFwr7OT2K\n9/yAkSxB3XVf6zZT0eLmxP3r/rUelJPsrzBSpC0IfJR/JeiteyT4wnOLpUstF7TG\njEVddSl4GdA5IXRzsUl6uJwJ5rqZcEmizSXvhuv4Q0njK30rDcYNwff6i5S71saO\n2dbvuQgFY0vrnzICy00/KE6KTnvCvXA9FEhe20jr9yw2KDb3XrXuPUcOQU9gCMOt\nFYmAzt07cPbvwDxZdby6IjZQ2hRpPgA3Qtwl/9A7ral888QtnRsnCW4WRmlDULfD\n6hPNB5dDceHFg2sqiO18Q8bJakKMER1/CfDbB7Ijfgarql0sW5oH86GrgjfR0AmS\nuvaZJyi1AgMBAAECggEAEJSIhXy5kbums4YpFVZKxe1n2HzT+f9ckZjzjfTDxiTu\nWEzdD0mAUF6u8o2c0AcEGaCHmJ/wG1KN1UIH9gWsJsm/9+XME6AmLcWL1pWl+cKE\n1o55kNvbEEX2d5faWyp7ylJNteuQO5Gv1YUrjIuLsPndbz6G1yUwr8e5hR4DOyRS\n2RB1UJcnehLZ6pZ85OyF/WyvQeLNtvFvwNtxBK+HwhJ1eglPPZjFUq6DjpvRXkBX\nhGqlCt3YJsyhasl1ddVP7QaLMUn8tO2a5SEqw/vGbkTVW01/d8tt/z8AyCaVFR8l\n85FKm2onpgfboWo7086CLawFUKeFVA82SnDGoa4nYQKBgQD/0ZGaGItD83xytaty\n2RYZeq0UYVl8hm0AC8Lio2Fzjyv6yKdNAf31ZjXXEIdHz6u+AO375GSnpDqtJ72y\nBzY6s+FaWey0B6DzHzIvN2PKhtmpap4zakC5XnZwCqDTpjW4+EypO1PJrchonkbk\nKqLObmrBJcOOOjQsOh+BSCZEVQKBgQDy4zkVqrZGw8lJ7bhsJgR5U1EbJUopaOhw\nZiIFTIK2LA8u6We+qUCJIW5lQgbpA/dD45u0ChuR2KdzyByWO9bR5/7vsloxuUKM\n+jijz/L2wiK927OtgEqd/R9Z0JVCmT0brtMTRXHZdTpQVLFpmAQAE/NNrFtfDi25\n2KdKdfqy4QKBgQDa0W3T+46UTx9yF0dR87LdlHub5TFgPLPbyDOpHMtsx1h9KUlB\nq6SJViZTkcXFfTOQUMdAITqf0vCF0GqIb3bJe7gVSroXvDbF/zc0ABMR14szSQmN\nPSOj69MvP0gWAiQN1gXs89xVtJqqMki9PmMIZJZYJG9DpzGdaxIryYVCCQKBgGdn\nfz0PMYzM+5wivZolUVBJvUTeSkV46UQ45xD0cs2V0lz5d3Z/Xf9DoVkwk/qN+q4H\nb5llmDkuUJQFRM5c6Wbx6uInPyjeI0wblxN+i4SsP9gueb9K1/mM8tTs7S6uSIrJ\nkgkpTn/y3YGnnOREmKdj1vhhgYDla2gsqYQU2EdhAoGANdyWJMKoIA/PVIVx78Ow\ngJirJb5sdM9z7dZCSBNie/MseH3AsUYfsEO8g5x1NNeZl+who/RJv7oih0DJP1P1\nh+gUek1b4JFshR2do/j1TyPAiRpcgwWxkkXT7HSNnoi2a40g3oiMmU0F09VCyTK4\n2KhOO8LOOLW298uQFvODTTs=\n-----END PRIVATE KEY-----\n";
// const email = "firebase-adminsdk-q2384@test-29402.iam.gserviceaccount.com";

// const id = "new-aight-now";
// const key =
//   "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwvY2AhPb2sI8w\npu93KPa32I8spRoIsMgHp3Nd9T7bd1Vtdpl+xhk07TAPZzRMOEvQ53+19IwdF4au\nhqoQvPb301/U/0JzEzRc2pAcx+Cu0E8LGOCVu4p9xERs294n24ewGQUSoVYFivQZ\nhm4N5nYQqQ8vSsq4DmB4zjyMpy8mUJQl02IgQt3p8FOiaR+0Q32x8IMVGwJikvD/\nOXD/I/T7NJqC9lEUlfXs7EQDQ2OhmADVAiqFOp+mr/0UNlvYvBltx+Tg+vkVN5bM\nJOVLgYB6o0Eh9yr5E74PNPPOYsCuo0WQ0xSZkTeXqgwWnNgu6wJTXaOFua8riWgT\nQVfIrHxPAgMBAAECggEAAMEHTZCYTRFq5QkYxWB8SDMfbw4d2G4Qxnd0kF5DqQQR\nRN0Kx+yQuXLe9OS0fCvbcWYWiQYDqWbBws6PyUa4dgtFu6rIu976/aTwGNAcZEQV\neC5HlhpmQbZLypC27HNZhjdWZnHd2/BbGMrH8r11h0NH1MWDgtOK8LFCOzoIE82F\nITkXgc7Z2pjpz3axZS5pOtoITuHTkRQQ7c2o31R3lOWKEX3zySM11iyK41iuF2tR\nNkzUszMDglOaMuK7SRYBnZkPF5crITvJpIUAoPHM/8B2dpMHMYlcjmiHs3cqzVbv\neyXTMUG1Pqt/UKBx9i5DXTuYSzh8W4esEiJyKSYdfQKBgQDZRTFqiD9t/I6OvJzB\nFNCuqG89vfJLHTH5aauQeocsxvbASdJCbQd3D5/ErAIBMd3e/CMRYYsxqPbTr91V\nex/Lqrw4bghw9o2VI4/e0PRPJGfWKDGqYTe9oQtq1YfyR/OdVVSwhByN/0iuxx4e\nUtXeOyKoOBuNpBeSf7ec7Cj4LQKBgQDQPtckYz6+goN+pEU9jgIBQhdfSrgwDjPn\nYqCmALDbzrwtx8OmV0/fycSuG9shR1E7/zLrkWB7baomLv8Qqdc0iBwg0MALrCvE\nNX8i+FWg+kdFhSSvyn36hvPBAVV9DcXtxYsp7WDjFHlcfPLPBl0fW5+0CklKymtG\nEAAiORs36wKBgFOgb1HK2WczI4fLDya+JUhkqlSAbOb+eMLAKnn0v1y7xDPk9hn9\nLzdjeyJO9oKROA3gzHqfKd1WZJK8CRwixO02bTXnHDamn3487t5bXP2tTI5AcEVd\nIABMIUHgqG/Xw+vV8T/zya3aCZbEK1KOnaTo7AEFf414EF6h7AFpYKeNAoGBAK1r\nd5z87TaX18uyH1tYlIDZuj8IKYUTftP1hZVYw+/5JSr2zg8LbSAPljPsTLtU+eh9\n6LjWU0PWmri7sHv/BJHhu5L0ZMoTskruxhaoOh8Z7hqN+3RNrEXi9sFHTBsdSjRt\nqyvaXDIfTcXg5A/V290OX1v+qPSYx2cMUiAt8GXLAoGAMLI9bVW2m+CmvjrABV4m\n+Wb++TdvwkDJIEcEPwznDPnHbmJTZ0lTalA6iGOl7wkmcLe0mzUVWxIJrGmNsMtA\n+57ib/iI9FAl81HMsTLwRsF1rT0tFeuuHAgf3RlcwXun9A3zEHu1fQMLqw3CfO4m\nKqjpPCd/uTnBCvm64rkds2w=\n-----END PRIVATE KEY-----\n";
// const email = "firebase-adminsdk-n0cye@new-aight-now.iam.gserviceaccount.com";

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: id as string,
//       clientEmail: email as string,
//       privateKey: key!.replace(/\\n/g, "\n"),
//     }),
//   });
// }

const serviceAccountPath = process.env.FIREBASE_ADMIN_SDK_KEY as string;
console.log(`Using service account key file at: ${serviceAccountPath}`);
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  console.log("Initializing Firebase Admin SDK...");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK initialized successfully.");
} else {
  console.log("Firebase Admin SDK already initialized.");
}

const adminAuth = admin.auth();
const db = admin.firestore();
export { adminAuth, db };
