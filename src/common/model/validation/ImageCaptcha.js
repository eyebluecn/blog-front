import BaseEntity from '../base/BaseEntity'

export default class ImageCaptcha extends BaseEntity {

	constructor(args) {
		super(args);

		this.blob = null;
		this.blobUrl = null;

		this.value = null;

		//是否可见
		this.visible = true;
	}

	static URL_CAPTCHA = "/support/captcha/fetch";

	refresh() {
		this.httpCaptcha();
	}


	httpCaptcha(successCallback, failureCallback) {
		let that = this;


		this.httpPost(ImageCaptcha.URL_CAPTCHA, {}, function (response) {

			that.errorMessage = null;
			that.blob = response.data;
			let URL = window.URL || window.webkitURL;

			that.blobUrl = URL.createObjectURL(that.blob);

			if (typeof successCallback === "function") {
				successCallback();
			}

		}, failureCallback, {responseType: "blob"});
	}

	reset() {
		this.value = null;

	}


}



