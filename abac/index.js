const fastifyPlugin = require('fastify-plugin')
const {
  Parser,
  Attribute,
  Namespace,
  Target,
  Condition,
  Rule,
  Policy,
  PolicySet,
  ABAC
} = require('abac-kernel')

module.exports = fastifyPlugin(function (app, _, done) {
  const ip = new Attribute({
    name: 'ip',
    path: ['ip'],
    schema: {
      type: 'string'
    }
  })
  const protocol = new Attribute({
    name: 'protocol',
    path: ['protocol'],
    schema: {
      type: 'string'
    }
  })

  const defaultNamespace = new Namespace({ name: 'defaultNamespace' })
    .addAttribute(ip)
    .addAttribute(protocol)

  const rule = new Rule({
    name: 'rule',
    effect: 'permit',
    condition: new Condition({
      name: 'test',
      ast: Parser.Parse('1 == 1')
    })
  })

  const policy = new Policy({
    name: 'policy',
    target: new Target(Parser.Parse('1 == 1')),
    algorithm: 'deny-unless-permit'
  }).addRule(rule)

  const policySet = new PolicySet({
    name: 'policySet',
    target: new Target(Parser.Parse('ip == \'127.0.0.1\' and protocol == \'http\'')),
    algorithm: 'deny-unless-permit'
  }).addPolicy(policy)

  const abac = new ABAC({ namespace: defaultNamespace })
    .addPolicySet(policySet)

  app.decorate('abac', abac)

  done()
})
