/*
This file is part of the Juju GUI, which lets users view and manage Juju
environments within a graphical interface (https://launchpad.net/juju-gui).
Copyright (C) 2017 Canonical Ltd.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License version 3, as published by
the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranties of MERCHANTABILITY,
SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var juju = {components: {}}; // eslint-disable-line no-unused-vars

chai.config.includeStack = true;
chai.config.truncateThreshold = 0;

describe('USSOLoginLink', () => {

  beforeAll(done => {
    // By loading this file it adds the component to the juju components.
    YUI().use('usso-login-link', () => { done(); });
  });

  it('can render an text link', () => {
    const output = jsTestUtils.shallowRender(
        <juju.components.USSOLoginLink
          displayType={'text'}
          loginToController={sinon.stub()} />);
    assert.deepEqual(output,
      <a className="logout-link"
        onClick={output.props.onClick}
        target="_blank">
        Login
      </a>);
  });

  it('calls loginToController on click for text link', () => {
    const loginToController = sinon.stub();
    const output = testUtils.renderIntoDocument(
        <juju.components.USSOLoginLink
          displayType={'text'}
          loginToController={loginToController} />, true);
    testUtils.Simulate.click(
      testUtils.findRenderedDOMComponentWithTag(output, 'a'));
    assert.equal(loginToController.callCount, 1);
  });

  it('can render an button link', () => {
    const component = jsTestUtils.shallowRender(
        <juju.components.USSOLoginLink
          displayType={'button'}
          loginToController={sinon.stub()} />, true);
    assert.deepEqual(component.getRenderOutput(),
      <juju.components.GenericButton
        action={component.getMountedInstance()._handleLogin}
        type="positive"
        title="Sign up or Login" />);
  });

  it('calls loginToController on click for button link', () => {
    const loginToController = sinon.stub();
    const output = testUtils.renderIntoDocument(
        <juju.components.USSOLoginLink
          displayType={'button'}
          loginToController={loginToController} />, true);
    testUtils.Simulate.click(
      testUtils.findRenderedDOMComponentWithTag(output, 'button'));
    assert.equal(loginToController.callCount, 1);
  });

  it('calls a callback after login if supplied', () => {
    const loginToController = sinon.stub();
    const callback = sinon.stub();
    const output = testUtils.renderIntoDocument(
        <juju.components.USSOLoginLink
          callback={callback}
          displayType={'text'}
          loginToController={loginToController} />, true);
    testUtils.Simulate.click(
      testUtils.findRenderedDOMComponentWithTag(output, 'a'));
    assert.equal(loginToController.callCount, 1);
    loginToController.args[0][0]();
    assert.equal(callback.callCount, 1);
  });

});
