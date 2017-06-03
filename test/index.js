import test from 'ava';

import Loadbalancer, {rule} from '../src/index';

test('test loadbalancer with random', async t => {
    const loadbalancer = new Loadbalancer({
        id: 'test-loadbalancer',
        services: [{
            address: '192.168.0.22',
            port: 9999
        }, {
            address: '192.168.0.30',
            port: 1111
        }]
    });

    t.pass();
});

test('test loadbalancer with round robin', async t => {
    const loadbalancer = new Loadbalancer({
        id: 'test-loadbalancer',
        services: [{
            address: '192.168.0.22',
            port: 9999
        }, {
            address: '192.168.0.30',
            port: 1111
        }],
        rule: rule.ROUND_ROBIN_RULE
    });

    t.pass();
});