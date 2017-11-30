<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-md-12">

				<div class="pedia-navigation">
					<span class="item active">基金详情</span>
				</div>

			</div>
		</div>

		<!--编辑，权限设置-->
		<div class="text-right mb10" v-if="foundation.canEdit()">
			<router-link class="btn btn-primary btn-sm" :to="'/by/foundation/edit/'+ foundation.id">
				<i class="fa fa-pencil"></i>
				编辑页面
			</router-link>
		</div>

		<div class="row">
			<div class="col-md-12">
				<LoadingFrame :loading="foundation.detailLoading">
					<div class="row">

						<div class="col-md-12">
							<FoundationView :foundation="foundation"/>
						</div>

						<div class="col-md-12" v-if="foundation.canEdit()">

							<!--相关项目-->
							<div>
								<ProjectRelatedView :keywords="keywords"/>
							</div>

							<div class="col-md-12 text-center" v-show="foundation.loading">
								<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
							</div>


							<div v-if="user.hasPermission(FeatureType.FOUNDATION_MANAGE)">
								<NbExpanding>
									<NbSlidePanel type="info" v-show="flipped">
						    <span slot="heading" class="f16">
						      <i class="fa fa-cogs"></i>
						      操作面板
						    </span>
										<span slot="actions">
					        <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
					      </span>
										<div slot="body">

											<FoundationOperationPanel :foundation="foundation" :successCallback="operationSuccessCallback"/>

										</div>
									</NbSlidePanel>
								</NbExpanding>
								<NbExpanding>
									<NbSlidePanel type="primary" v-show="!flipped">
                    <span slot="heading" class="f16">
                      <i class="fa fa-cogs"></i>
                        评审通知
                    </span>
										<span slot="actions">
                        <i class="fa fa-exchange f16 white btn-action" @click.stop.prevent="flipped=!flipped"></i>
                      </span>
										<div slot="body">
											<NotificationControlPanel :notification="notification" :successCallback="notificationFinish"/>
										</div>
									</NbSlidePanel>
								</NbExpanding>


								<div>

								</div>

							</div>


						</div>


					</div>
				</LoadingFrame>
			</div>

		</div>

	</div>
</template>
<script>
	import {MessageBox, Notification as NotificationBox} from 'element-ui'
	import Foundation from '../../../common/model/foundation/Foundation'
	import Project from '../../../common/model/project/Project';
	import NbTank from '../../../common/widget/NbTank'
	import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue'
	import NbExpanding from '../../../common/widget/NbExpanding.vue'
	import NbBtnDropdown from "../../../common/widget/NbBtnDropdown.vue";
	import LoadingFrame from "../widget/LoadingFrame";
	import RelatedView from "../widget/RelatedView.vue";
	import CreateSaveButton from "../widget/CreateSaveButton.vue"
	import UserProfileLink from "../widget/UserProfileLink";
	import FoundationView from "./widget/FoundationView.vue";
	import {simpleDateTime, simpleDate} from "../../../common/filter/time";
	import MessageNotifyView from "../message/notify/MessageNotifyView";
	import {smoothScroll} from "../../../common/util/AnimationUtils";
	import ProjectRelatedView from "../project/RelatedView.vue";

	import FoundationOperationPanel from "./widget/FoundationOperationPanel.vue";
	import NotificationControlPanel from "../notification/widget/ControlPanel.vue";
	import Notification from "../../../common/model/notification/Notification";
	import {FeatureType} from "../../../common/model/core/feature/FeatureType";

	export default {

		data() {
			return {
				flipped: true,
				notification: new Notification(),
				FeatureType,
				user: this.$store.state.user,
				foundation: new Foundation(),
				submitErrorMessage: null,
				Project: Project
			}
		},
		components: {
			NbTank,
			NbSlidePanel,
			NbExpanding,
			NbBtnDropdown,
			LoadingFrame,
			CreateSaveButton,
			UserProfileLink,
			RelatedView,
			FoundationView,
			MessageNotifyView,
			FoundationOperationPanel,
			NotificationControlPanel,
			ProjectRelatedView
		},
		computed: {
			keywords() {
				return [...this.foundation.keywords, ...this.foundation.trades]
			}
		},
		methods: {
			fetchDetail() {
				let that = this;
				this.foundation.id = this.$store.state.route.params.id;
				if (this.foundation.id) {
					this.foundation.httpDetail();
				}
			},
			refreshEvent() {
				if (this.$refs.messageNotifyView) {
					this.$refs.messageNotifyView.refresh();
				}
				if (this.$refs.projectView) {
					this.$refs.projectView.refresh();
				}
			},
			submit() {

			},
			operationSuccessCallback(response) {

				let that = this;
				that.flipped = false;

				that.notification.render(response.data.notification);
				that.notification.entityId = that.foundation.id;
				that.refreshEvent();

			},
			notificationFinish() {
				//通知成功发送的回掉函数。通知成功了之后，必须去更新该条事件。
				let that = this;
				smoothScroll(this.$refs.flowNode);
				that.refreshEvent();

			}
		},
		mounted() {
			this.fetchDetail();
			this.refreshEvent();
		}
	}
</script>
