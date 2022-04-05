import React from 'react';
import { mount } from 'enzyme';
import { SocialMedia } from './index';
import { act } from "react-dom/test-utils";



describe('SocialMedia Component', () => {
  it('should load FB Link properly', async () => {
    const props = {
      dataList: {
        data: {
          attributes: {
            field_facebook: {
              uri: "facebookLink"
            }
          }
        }
      }
    }
    let wrapper: any;
    await act(async () => {
      wrapper = mount(<SocialMedia {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.find(`i`).at(0).is(`.icon-facebook`)).toBeTruthy();
    expect(wrapper!.find(`a`)).toHaveLength(1);
    expect(wrapper!.find(`a`).prop('href')).toEqual('facebookLink');
  })
  
  it('should load LinkedIn Link properly', async () => {
    const props = {
      dataList: {
        data: {
          attributes: {
            field_linkedin: {
              uri: "linkedInLink"
            }
          }
        }
      }
    }
    let wrapper: any;
    await act(async () => {
      wrapper = mount(<SocialMedia {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.find(`i`).at(0).is(`.icon-linkedin`)).toBeTruthy();
    expect(wrapper!.find(`a`)).toHaveLength(1);
    expect(wrapper!.find(`a`).prop('href')).toEqual('linkedInLink');
  })
  
  it('should load Twitter Link properly', async () => {
    const props = {
      dataList: {
        data: {
          attributes: {
            field_twitter: {
              uri: "twitterLink"
            }
          }
        }
      }
    }
    let wrapper: any;
    await act(async () => {
      wrapper = mount(<SocialMedia {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.find(`i`).at(0).is(`.icon-twitter`)).toBeTruthy();
    expect(wrapper!.find(`a`)).toHaveLength(1);
    expect(wrapper!.find(`a`).prop('href')).toEqual('twitterLink');
  })
  
  it('should load Instagram Link properly', async () => {
    const props = {
      dataList: {
        data: {
          attributes: {
            field_instagram: {
              uri: "instagramLink"
            }
          }
        }
      }
    }
    let wrapper: any;
    await act(async () => {
      wrapper = mount(<SocialMedia {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.find(`i`).at(0).is(`.icon-instagram`)).toBeTruthy();
    expect(wrapper!.find(`a`)).toHaveLength(1);
    expect(wrapper!.find(`a`).prop('href')).toEqual('instagramLink');
  })
  
  it('should load Multiple Links properly', async () => {
    const props = {
      dataList: {
        data: {
          attributes: {
            field_facebook: {
              uri: "facebookLink"
            },
            field_linkedin: {
              uri: "linkedInLink"
            },
            field_twitter: {
              uri: "twitterLink"
            },
            field_instagram: {
              uri: "instagramLink"
            }
          }
        }
      }
    }
    let wrapper: any;
    await act(async () => {
      wrapper = mount(<SocialMedia {...props} />);
    })
    await wrapper!.update();
    expect(wrapper!.find(`a`)).toHaveLength(4);
    expect(wrapper!.find(`a`).at(0).prop('href')).toEqual('facebookLink');
    expect(wrapper!.find(`i`).at(0).is(`.icon-facebook`)).toBeTruthy();
    expect(wrapper!.find(`a`).at(1).prop('href')).toEqual('linkedInLink');
    expect(wrapper!.find(`i`).at(1).is(`.icon-linkedin`)).toBeTruthy();
    expect(wrapper!.find(`a`).at(2).prop('href')).toEqual('twitterLink');
    expect(wrapper!.find(`i`).at(2).is(`.icon-twitter`)).toBeTruthy();
    expect(wrapper!.find(`a`).at(3).prop('href')).toEqual('instagramLink');
    expect(wrapper!.find(`i`).at(3).is(`.icon-instagram`)).toBeTruthy();
  })
})


