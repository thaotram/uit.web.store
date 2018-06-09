import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import { getUserInfo } from '../../src/server/database/utils/Facebook';
import database, { User } from '../../src/server/database/database';
import nock from 'nock';
import { FacebookApiException } from 'fb';

describe(filename(__filename), function() {
    this.timeout(1000000);
    const access_token =
        'EAACEdEose0cBAKox3Cbdr9pIZAQPI4YW9tAzxmw0jtCc0PVMdZAKSJvt4ug6CyDEovYxkOh7ZCXXInbwpuJY9QO1ZCXgdSccfYouQKszcP46ipw9S3N21aX6NZCWnQztZANF1oNTM7Qg64tsn0pyD5EUuQqeftaW320ZBdTY7DVBJ0eUIDy1NVnaYZA31ZBgmkdwTgI4k9RnX4QZDZD';

    beforeEach(function() {
        nock(`https://graph.facebook.com`)
            .get(`/me?fields=id,name&access_token=${access_token}`)
            .reply(200, {
                id: 715380908507851,
                name: 'Lê Thị Thảo Trâm',
            });
    });

    it(itname('.getUserInfo()', 'Lấy thông tin người dùng'), async function() {
        const info = await getUserInfo(access_token);

        if (info.error) {
            assert.isTrue(info.error instanceof FacebookApiException);
        } else {
            assert.equal(info.name, 'Lê Thị Thảo Trâm');
        }
    });

    it(itname('User.getByAccessToken()', 'Tạo thông tin người dùng'), async function() {
        const realm = await database();
        try {
            const user = await User.getByAccessToken(realm, access_token);
            assert.equal(user.name, 'Lê Thị Thảo Trâm');
        } catch (e) {
            assert.equal(e.error, `Can't get user info`);
        }
    });
});
