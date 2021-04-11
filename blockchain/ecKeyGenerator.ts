import { ec } from 'elliptic';

const ecAlgorythm = new ec('secp256k1');

const keyPair = ecAlgorythm.genKeyPair();
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

