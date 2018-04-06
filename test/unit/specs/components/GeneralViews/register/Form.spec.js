/* global describe it */
import { shallow } from 'vue-test-utils'
const Register = require('../../components/GeneralViews/register/Form.vue')

const factory = (values = {}) => {
  return shallow(Register, {
    data: { ...values }
  })
}

describe('Register', () => {
  it('name contains only letters', () => {
    const wrapper = factory({name: 'Daniela'})
    expect(wrapper.find('.name').text()).toEqual('Daniela')
  })
  //
  // it('renders an error when username is less than 7 characters', () => {
  //   const wrapper = factory({ username: ''  })
  //
  //   expect(wrapper.find('.error').exists()).toBeTruthy()
  // })
  //
  // it('renders an error when username is whitespace', () => {
  //   const wrapper = factory({ username: ' '.repeat(7) })
  //
  //   expect(wrapper.find('.error').exists()).toBeTruthy()
  // })
  //
  // it('does not render an error when username is 7 characters or more', () => {
  //   const wrapper = factory({ username: 'Lachlan'  })
  //
  //   expect(wrapper.find('.error').exists()).toBeFalsy()
  // })
})
