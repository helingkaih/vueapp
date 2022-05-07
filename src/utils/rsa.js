import JSEncrypt from 'jsencrypt'

class JsEncryptNew extends JSEncrypt {
    constructor() {
        super();
        this.b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        this.b64pad = '=';
        this.BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz';
    }

    int2char = function (n) {
        return this.BI_RM.charAt(n);
    };
    b64tohex = function (s) {
        var ret = '';
        var i;
        var k = 0; // b64 state, 0-3
        var slop = 0;
        for (i = 0; i < s.length; ++i) {
            if (s.charAt(i) === this.b64pad) {
                break;
            }
            var v = this.b64map.indexOf(s.charAt(i));
            if (v < 0) {
                continue;
            }
            if (k === 0) {
                ret += this.int2char(v >> 2);
                slop = v & 3;
                k = 1;
            } else if (k === 1) {
                ret += this.int2char((slop << 2) | (v >> 4));
                slop = v & 0xf;
                k = 2;
            } else if (k === 2) {
                ret += this.int2char(slop);
                ret += this.int2char(v >> 2);
                slop = v & 3;
                k = 3;
            } else {
                ret += this.int2char((slop << 2) | (v >> 4));
                ret += this.int2char(v & 0xf);
                k = 0;
            }
        }
        if (k === 1) {
            ret += this.int2char(slop << 2);
        }
        return ret;
    };
    hex2b64 = function (h) {
        var i;
        var c;
        var ret = '';
        for (i = 0; i + 3 <= h.length; i += 3) {
            c = parseInt(h.substring(i, i + 3), 16);
            ret += this.b64map.charAt(c >> 6) + this.b64map.charAt(c & 63);
        }
        if (i + 1 === h.length) {
            c = parseInt(h.substring(i, i + 1), 16);
            ret += this.b64map.charAt(c << 2);
        } else if (i + 2 === h.length) {
            c = parseInt(h.substring(i, i + 2), 16);
            ret += this.b64map.charAt(c >> 2) + this.b64map.charAt((c & 3) << 4);
        }
        while ((ret.length & 3) > 0) {
            ret += this.b64pad;
        }
        return ret;
    };
    // 分段加密
    encryptLong = function (string) {
        var k = this.getKey();
        // var maxLength = (((k.n.bitLength() + 7) >> 3) - 11);//117
        try {
            // var lt = '';
            var ct = '';
            // RSA每次加密117bytes，需要辅助方法判断字符串截取位置
            // 1.获取字符串截取点
            var bytes = [];
            bytes.push(0);
            var byteNo = 0;
            var len, c;
            len = string.length;
            var temp = 0;
            for (var i = 0; i < len; i++) {
                c = string.charCodeAt(i);
                if (c >= 0x010000 && c <= 0x10FFFF) {
                    byteNo += 4;
                } else if (c >= 0x000800 && c <= 0x00FFFF) {
                    byteNo += 3;
                } else if (c >= 0x000080 && c <= 0x0007FF) {
                    byteNo += 2;
                } else {
                    byteNo += 1;
                }
                if ((byteNo % 117) >= 114 || (byteNo % 117) === 0) {
                    if (byteNo - temp >= 114) {
                        bytes.push(i);
                        temp = byteNo;
                    }
                }
            }
            // 2.截取字符串并分段加密
            if (bytes.length > 1) {
                for (let i = 0; i < bytes.length - 1; i++) {
                    var str;
                    if (i === 0) {
                        str = string.substring(0, bytes[i + 1] + 1);
                    } else {
                        str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
                    }
                    var t1 = k.encrypt(str);
                    ct += t1;
                }
                ;
                if (bytes[bytes.length - 1] !== string.length - 1) {
                    var lastStr = string.substring(bytes[bytes.length - 1] + 1);
                    ct += k.encrypt(lastStr);
                    // debugger;
                }
                return this.hex2b64(ct);
            }
            var t = k.encrypt(string);
            var y = this.hex2b64(t);
            return y;

        } catch (ex) {
            return false;
        }
    };
    // 分段解密长字符串
    decryptLong = function (text) {
        // Return the decrypted string.
        // console.log(this);
        var k = this.getKey();
        var maxLength = ((k.n.bitLength() + 7) >> 3);
        try {
            var str = this.b64tohex(text);
            // var b=hex2Bytes(str);

            var inputLen = str.length;

            var ct = '';

            if (inputLen > maxLength) {

                var lt = str.match(/.{1,256}/g);
                lt.forEach(function (entry) {
                    var t1 = k.decrypt(entry);
                    ct += t1;
                });
                return ct;
            }
            var y = k.decrypt(this.b64tohex(text));
            return y;
        } catch (ex) {
            return false;
        }
    };
}
// 公钥
const publickey = `
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHMh4t3CA4Zd1K2y9TKNZQMcYOJu
87lXglECJQ7pIE/2eAD3KJ6XI40cuqM7sK0Mn9lEJOWFl84gkZnKISfg5A3I06K3
T1yD4x0T9Q0Ie1szfwTzdEtVbh1KFb/ZcZGVEpoq1uy9REdvmTZSB9tQOHidZqg/
wEDtLD+1FKp6jS2vAgMBAAE=
-----END PUBLIC KEY-----
`;
// 私钥
const privatekey = `
-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgHMh4t3CA4Zd1K2y9TKNZQMcYOJu87lXglECJQ7pIE/2eAD3KJ6X
I40cuqM7sK0Mn9lEJOWFl84gkZnKISfg5A3I06K3T1yD4x0T9Q0Ie1szfwTzdEtV
bh1KFb/ZcZGVEpoq1uy9REdvmTZSB9tQOHidZqg/wEDtLD+1FKp6jS2vAgMBAAEC
gYAxYzrfZ8d9TyjZbigSjGblY7oHyBKS0gAb4fClqclro82slFl/VlQwxz8koIlU
YlL7r2iocJtDF+N9diCs66LH0+KCxvKDjzuy2xYFAVt8Wh5d8kml9ksJSGyzbwmX
B1kJ9mmghmPDpwBaXJ1iYFLyKtIAfvp4Lx2Bn8ROlOYJIQJBANdktvwYtka33ume
41e20G/byBkGnJSow3g+q/SxkDGoPoVg/+jdloh5GPQz5nGLPoO5XiAEywYvEZM4
wdzpr3ECQQCI1mMzAsIWdN1qOeWLyt+ZreQps2fjywJ16gULO3J8nIeiQk/wvu3H
f/itpTJdtDT1HUYJFe/233N9sdp9hl8fAkAyxJtYqh50ZqxU1k1xhDZ21w+/zk4j
v+9qrSLsptl8ytIJsAZBhdEQU7KtBHqhcpeGhq+Hznln+LokwDD5d98RAkAuouKs
QARmIu5Thef1/O64McvRapO9zzLHfTq62UfrsG2Jn5AfPPNNSxA2HldMGF70K0Xz
Usa2HPH/pN4SafmBAkBkdVPrK6FyW56IBGLHx2k8N9jTcjQjMk5kOL6EZeCh844I
dSBclLHBQUiXgKTSZqp0R05kBL+0DyvNzgdfam2B
-----END RSA PRIVATE KEY-----
`;

// 公钥加密 私钥解密

/**
 * 加密
 * @param {*} data 
 * @returns 
 */
function encrypt(data) {
    const jsencrypt = new JsEncryptNew();
    jsencrypt.setPublicKey(publickey);
    return jsencrypt.encryptLong(data)
}

/**
 * 解密
 * @param {*} data 
 */
function decrypt(data) {
    let decrypt = new JsEncryptNew();
    decrypt.setPrivateKey(privatekey);
    return decrypt.decryptLong(data)
}

export { encrypt, decrypt }