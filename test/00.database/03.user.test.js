import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import { getUserInfo } from '../../src/server/credential/facebook.server';
import database, { User } from '../../src/server/database/database';
import nock from 'nock';

describe(filename(__filename), function() {
    this.timeout(1000000);
    const token = 'THIS_IS_A_FAKE_ACCESS_TOKEN';
    const sessionId = 'THIS_IS_A_FAKE_SESSION_ID';

    beforeEach(function() {
        nock('https://graph.facebook.com')
            .get(`/v3.0/me?fields=%5B%22id%22%2C%22name%22%5D&access_token=${token}`)
            .reply(200, {
                id: 715380908507851,
                name: 'Lê Thị Thảo Trâm',
            });
    });

    it(itname('.getUserInfo()', 'Lấy thông tin người dùng'), async function() {
        const info = await getUserInfo(token);
        assert.equal(info.name, 'Lê Thị Thảo Trâm');
    });

    it(itname('User.get()', 'Tạo thông tin người dùng'), async function() {
        const realm = await database();
        try {
            const req = {
                id: 715380908507851,
                token,
            };
            const user = await User.get(realm, req, sessionId);
            assert.equal(user.name, 'Lê Thị Thảo Trâm');
        } catch (e) {
            // console.log(e);
            assert.equal(e.error, `Can't get user info`);
        }
    });
});
