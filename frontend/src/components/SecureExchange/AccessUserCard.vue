<template>
  <v-card
    :id="`edxUser-${user.edxUserID}`"
    class="h-100"
  >
    <v-card-title class="pb-0">
      <v-row no-gutters>
        <v-col>
          <v-row no-gutters>
            <v-col cols="9">
              <span style="white-space: break-spaces">
                <strong>{{ `${user.firstName} ${user.lastName}` }}</strong>
              </span>
            </v-col>
            <v-col
              v-if="isNotSameEdxUser()"
              cols="3"
              class="d-flex justify-end"
            >
              <v-btn
                :id="`user-edit-button-${user.edxUserID}`"
                title="Edit"
                color="white"
                width="0.5em"
                min-width="0.5em"
                depressed
                small
                class="mr-2"
                @click="clickEditButton"
              >
                <v-icon
                  size="x-large"
                  color="#003366"
                  dark
                >
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                :id="`user-remove-button-${user.edxUserID}`"
                title="Remove"
                color="white"
                width="0.5em"
                min-width="0.5em"
                depressed
                small
                class="mr-2"
                @click="clickDeleteButton"
              >
                <v-icon
                  size="x-large"
                  color="#003366"
                  dark
                >
                  mdi-delete
                </v-icon>
              </v-btn>
              <v-btn
                :id="`user-relink-button-${user.edxUserID}`"
                title="Re-Link"
                color="white"
                width="0.5em"
                min-width="0.5em"
                depressed
                small
                @click="clickRelinkButton"
              >
                <v-icon
                  size="x-large"
                  color="#003366"
                  dark
                >
                  mdi-backup-restore
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              class="pt-1"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pb-0">
      <v-list density="compact">
        <v-list-item
          v-if="user.email"
          class="pl-0"
        >
          <v-icon
            icon="mdi-email"
            start
          />
          <span id="user-email"> {{ user.email }}</span>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-text
      class="pt-2"
      :style="[editState ? {'background-color': '#e7ebf0'} : {'background-color': 'white'}]"
    >
      <v-chip-group v-if="!editState">
        <v-chip
          v-for="role in userRoles"
          :key="role.edxRoleCode"
          disabled
        >
          {{ getRoleLabel(role) }}
        </v-chip>
      </v-chip-group>
      <v-list
        v-else
        v-model:selected="selectedRoles"
        lines="two"
        return-object
        select-strategy="classic"
        style="background-color: #e7ebf0"
        @update:selected="selectedRolesChanged"
      >
        <div
          v-for="newrole in instituteRoles"
          :key="newrole.edxRoleCode"
          :value="newrole.edxRoleCode"
        >
          <v-list-item
            :disabled="roleDisabled(newrole)"
            :value="newrole.edxRoleCode"
          >
            <template #prepend="{ isActive }">
              <v-list-item-action>
                <v-checkbox-btn :model-value="isActive" />
              </v-list-item-action>
            </template>

            <v-list-item-title>{{ newrole.label }}</v-list-item-title>

            <v-list-item-subtitle v-if="newrole.edxRoleCode === edxInstituteAdminRole">
              EDX {{ instituteTypeLabel }} Admin users will be set up with all
              {{ instituteTypeLabel.toLowerCase() }} roles.
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else>
              {{ newrole.roleDescription }}
            </v-list-item-subtitle>
          </v-list-item>
        </div>
      </v-list>
    </v-card-text>
    <Transition name="bounce">
      <v-card-text
        v-if="deleteState"
        style="background-color: #e7ebf0;"
        class="deleteEdxUserConfirmationDialog"
      >
        <v-row no-gutters>
          <v-col class="d-flex justify-center">
            <span style="font-size: medium; font-weight: bold; color: black">
              Are you sure you want to remove this users access for the
              {{ instituteTypeLabel.toLowerCase() }}?
            </span>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="mt-3 d-flex justify-end">
            <PrimaryButton
              :id="`user-cancel-remove-button-${user.firstName}-${user.lastName}`"
              width="5em"
              text="Cancel"
              class="mr-2 cancelUserDeleteButton"
              secondary
              :click-action="clickDeleteButton"
            />
            <PrimaryButton
              :id="`user-remove-action-button-${user.firstName}-${user.lastName}`"
              text="Remove"
              class="confirmUserDeleteButton"
              :click-action="clickRemoveButton"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Transition>
    <Transition name="bounce">
      <v-card-text
        v-if="relinkState"
        style="background-color: #e7ebf0;"
      >
        <v-row no-gutters>
          <v-col class="d-flex justify-center">
            <span style="font-size: medium; font-weight: bold; color: black">
              Re-linking an account will remove the current user and resend the activation code so
              that the user can set up EDX access with their new credential.
            </span>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="pt-3 d-flex justify-start">
            <span
              :id="`userRelinkWarningText-${user.edxUserID}`"
              style="font-size: medium; font-weight: bold; color: black"
            >Are you sure you want to re-link this account?</span>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="mt-3 d-flex justify-end">
            <PrimaryButton
              :id="`user-cancel-relink-button-${user.edxUserID}`"
              width="5em"
              text="Cancel"
              class="mr-2"
              secondary
              :click-action="clickRelinkButton"
            />
            <PrimaryButton
              :id="`user-relink-action-button-${user.edxUserID}`"
              text="Re-Link"
              :click-action="clickActionRelinkButton"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Transition>
    <Transition name="bounce">
      <v-card-text
        v-if="editState"
        class="pt-0"
        style="background-color: #e7ebf0;"
      >
        <v-row
          v-if="!minimumRolesSelected"
          no-gutters
        >
          <v-col class="mt-0 d-flex justify-start">
            <p style="font-weight: bolder;color: black;">
              Please select at least one role for {{ user.firstName }}.
            </p>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="mt-0 d-flex justify-end">
            <PrimaryButton
              :id="`user-cancel-edit-button-${user.edxUserID}`"
              width="5em"
              text="Cancel"
              class="mr-2"
              secondary
              :click-action="clickEditButton"
            />
            <PrimaryButton
              :id="`user-save-action-button-${user.edxUserID}`"
              text="Save"
              :disabled="!minimumRolesSelected"
              :click-action="clickSaveButton"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </Transition>
  </v-card>
</template>
<script>
import PrimaryButton from '../util/PrimaryButton.vue';
import ApiService from '../../common/apiService';
import alertMixin from '../../mixins/alertMixin';
import {ApiRoutes, EDX_SAGA_REQUEST_DELAY_MILLISECONDS} from '../../utils/constants';
import { authStore } from '../../store/modules/auth';
import { edxStore } from '../../store/modules/edx';
import { mapState } from 'pinia';

export default {
  name: 'AccessUserCard',
  components: {PrimaryButton},
  mixins: [alertMixin],
  props: {
    user: {
      type: Object,
      required: true
    },
    userRoles: {
      type: Array,
      required: true
    },
    instituteRoles: {
      type: Array,
      required: true
    },
    instituteCode: {
      type: String,
      required: true
    },
    instituteTypeLabel: {
      type: String,
      required: true
    },
    instituteTypeCode: {
      type: String,
      required: true
    },
  },
  emits: ['refresh'],
  data() {
    return {
      editState: false,
      deleteState: false,
      relinkState: false,
      selectedRoles: []
    };
  },
  computed: {
    ...mapState(edxStore, ['schoolRoles']),
    ...mapState(authStore, ['userInfo']),
    isEDXInstituteAdminSelected() {
      return this.selectedRoles.includes(this.edxInstituteAdminRole);
    },
    minimumRolesSelected() {
      return this.selectedRoles.length > 0;
    },
    edxInstituteAdminRole() {
      if (this.instituteTypeCode === 'SCHOOL') {
        return 'EDX_SCHOOL_ADMIN';
      }
      return 'EDX_DISTRICT_ADMIN';
    }
  },
  methods: {
    roleDisabled(role) {
      if (role.edxRoleCode === this.edxInstituteAdminRole) {
        return false;
      }
      return this.isEDXInstituteAdminSelected;
    },
    selectedRolesChanged() {
      if (!this.isEDXInstituteAdminSelected) {
        return;
      }
      this.selectedRoles = [this.edxInstituteAdminRole];
    },
    getButtonWidth() {
      switch (this.$vuetify.display.name) {
      case 'xs':
      case 'sm':
      case 'md':
        return '2em';
      case 'lg':
      case 'xl':
      default:
        return '7em';
      }
    },
    getRoleLabel(curRole) {
      if (this.instituteRoles.length > 0) {
        return this.instituteRoles.find((role) => role.edxRoleCode === curRole.edxRoleCode).label;
      }
      return '';
    },
    clickEditButton() {
      this.relinkState = false;
      this.deleteState = false;
      this.editState = !this.editState;
      this.setUserRolesAsSelected();
    },
    clickDeleteButton() {
      this.editState = false;
      this.relinkState = false;
      this.deleteState = !this.deleteState;
    },
    clickRelinkButton() {
      this.editState = false;
      this.deleteState = false;
      this.relinkState = !this.relinkState;
    },
    clickActionRelinkButton() {
      const payload = {
        params:{
          userToRelink: this.user.edxUserID,
        }
      };
      if (this.instituteTypeCode === 'SCHOOL') {
        const userSchool = this.user.edxUserSchools
          .find(school => school.schoolID === this.instituteCode);
        payload.params.schoolID = this.instituteCode;
        payload.params.userSchoolID = userSchool.edxUserSchoolID;
      } else {
        const userDistrict = this.user.edxUserDistricts
          .find(district => district.districtID === this.instituteCode);
        payload.params.districtID = this.instituteCode;
        payload.params.edxUserDistrictID = userDistrict.edxUserDistrictID;
      }
      ApiService.apiAxios.post(ApiRoutes.edx.EXCHANGE_RELINK_USER, payload)
        .then(() => {
          this.setSuccessAlert('User has been removed, email sent with instructions to re-link.');
        }).catch(error => {
          this.setFailureAlert(
            'An error occurred while re-linking a user. Please try again later.'
          );
          console.log(error);
        }).finally(() => {
          setTimeout(() => { this.$emit('refresh'); }, EDX_SAGA_REQUEST_DELAY_MILLISECONDS);
        });
    },
    clickRemoveButton() {
      const payload = {
        params:{
          userToRemove: this.user.edxUserID
        }
      };
      if (this.instituteTypeCode === 'SCHOOL') {
        const userSchool = this.user.edxUserSchools
          .find(school => school.schoolID === this.instituteCode);
        payload.params.schoolID = userSchool.schoolID;
        payload.params.userSchoolID = userSchool.edxUserSchoolID;
      } else {
        const userDistrict = this.user.edxUserDistricts
          .find(district => district.districtID === this.instituteCode);
        payload.params.districtID = this.instituteCode;
        payload.params.edxUserDistrictID = userDistrict.edxUserDistrictID;
      }
      ApiService.apiAxios.post(ApiRoutes.edx.EXCHANGE_REMOVE_USER, payload)
        .then(() => {
          this.setSuccessAlert('User has been removed.');
        }).catch(error => {
          this.setFailureAlert('An error occurred while removing a user. Please try again later.');
          console.log(error);
        }).finally(() => {
          this.$emit('refresh');
        });
    },
    clickSaveButton() {
      if (!this.minimumRolesSelected) {
        this.setFailureAlert(`Please select at least one role for ${this.user.firstName}.`);
        return;
      }
      this.editState = !this.editState;
      const payload = {
        params: {
          edxUserID: this.user.edxUserID,
          selectedRoles: this.selectedRoles
        }
      };
      if (this.instituteTypeCode === 'SCHOOL') {
        payload.params.schoolID = this.instituteCode;
      } else {
        payload.params.districtId = this.instituteCode;
      }
      ApiService.apiAxios.post(ApiRoutes.edx.EXCHANGE_ACCESS_ROLES_URL, payload)
        .then(() => {
          this.setSuccessAlert('User roles have been updated.');
        }).catch(error => {
          this.setFailureAlert(
            'An error occurred while updating user roles. Please try again later.'
          );
          console.log(error);
        }).finally(() => {
          this.$emit('refresh');
        });
    },
    setUserRolesAsSelected() {
      let mySelection = [];
      //look through all our roles. If user has this role, then mark the index
      this.instituteRoles.forEach((role) => {
        let result = this.userRoles.find((userRole) =>
          userRole.edxRoleCode === role.edxRoleCode
        );

        if (result) {
          mySelection.push(role.edxRoleCode);
        }
      });

      this.selectedRoles = [...mySelection];
    },
    isNotSameEdxUser() {
      return this.userInfo.edxUserID !== this.user.edxUserID;
    },
  }
};
</script>

<style scoped>
.v-list-item-title {
  color: #003366;
}

.actionButton {
  background-color: #003366;
  color: white;
}

.bounce-leave-active {
  animation: bounce-in 0.1s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>

