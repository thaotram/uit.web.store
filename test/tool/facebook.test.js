import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import { getUserInfo } from '../../src/server/database/utils/Facebook';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(itname('.getUserInfo()', 'Lấy thông tin người dùng'), async function() {
        const access_token =
            'EAACEdEose0cBAKox3Cbdr9pIZAQPI4YW9tAzxmw0jtCc0PVMdZAKSJvt4ug6CyDEovYxkOh7ZCXXInbwpuJY9QO1ZCXgdSccfYouQKszcP46ipw9S3N21aX6NZCWnQztZANF1oNTM7Qg64tsn0pyD5EUuQqeftaW320ZBdTY7DVBJ0eUIDy1NVnaYZA31ZBgmkdwTgI4k9RnX4QZDZD';
        const info = await getUserInfo(access_token);
        assert.equal(info.name, 'Lê Thị Thảo Trâm');
    });
});
