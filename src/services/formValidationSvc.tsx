// form Validation service
export default class FormValidationSvc {
  // validate the pattern input entering
  static validateInputEnteringPattern(event: any, fieldNameValueCurrent?: string) {
    return event.target.validity.valid
      ? event.target.value.toString()
      : (fieldNameValueCurrent || '').toString()
  }
  
  // validate Email
  static validateEmail(mail: string) {
    if (mail === '') {
      return true
    }
    // eslint-disable-next-line security/detect-unsafe-regex
    const filter = /(.+)@(.+){2,}\.(.+){2,}/
    if (filter.test(mail)) {
      return true
    } else {
      return false
    }
  }
}
