<script setup>
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, maxLength, sameAs } from '@vuelidate/validators'

let passwordData = reactive({
    oldpassword: null,
    newpassword: null,
    repeatenewpassword: null,
})


// validation rules
const limit_rules = (label) => {
    return {
        required: helpers.withMessage(
            `لطفا ${label} را وارد کنید.`,
            required
        ),
        minLength: helpers.withMessage(
            "رمز عبور باید بیشتر از 8 کاراکتر باشد.",
            minLength(8)
        ),
        maxLength: helpers.withMessage(
            "رمز عبور باید کمتر از 12 کاراکتر باشد.",
            maxLength(12)
        ),
    }
}

const rules = computed(() => {
    return {
        oldpassword: limit_rules('رمز عبور قبلی'),
        newpassword: limit_rules('رمز عبور جدید'),
        repeatenewpassword: {
            required: helpers.withMessage(
                `لطفا تکرار رمز عبور جدید را وارد کنید.`,
                required
            ),
            minLength: helpers.withMessage(
                "رمز عبور باید بیشتر از 8 کاراکتر باشد.",
                minLength(8)
            ),
            maxLength: helpers.withMessage(
                "رمز عبور باید کمتر از 12 کاراکتر باشد.",
                maxLength(12)
            ),
            sameAsPassword: helpers.withMessage(
                "رمز عبور با تکرار آن برابر نیست.",
                sameAs(passwordData.newpassword)
            )
        }
    }
});

const submitfunc = async () => {
    const result = await v$.value.$validate()
    console.log("kion", result);
}

const v$ = useVuelidate(rules, passwordData);
</script>

<template>
    <div class="centerx labelx  w-full md:w-1/2 lg:w-1/3 flex flex-wrap">
        <div class="w-full sm:w-1/2 md:w-full p-2">
            <vs-input class="!w-full" max="12" type="password" val-icon-danger="close" label="رمز عبور قبلی"
                :danger="v$.oldpassword.$error" :danger-text="v$.oldpassword.$errors[0]?.$message" color="dark"
                v-model="passwordData.oldpassword" />
        </div>
        <div class="w-full sm:w-1/2 md:w-full p-2">
            <vs-input class="!w-full" type="password" val-icon-danger="close" label="رمز عبور جدید" color="dark"
                :danger="v$.newpassword.$error" :danger-text="v$.newpassword.$errors[0]?.$message"
                v-model="passwordData.newpassword" />
        </div>
        <div class="w-full sm:w-1/2 md:w-full p-2">
            <vs-input class="!w-full" type="password" val-icon-danger="close" label="تکرار رمز عبور جدید" color="dark"
                :danger="v$.repeatenewpassword.$error" :danger-text="v$.repeatenewpassword.$errors[0]?.$message"
                v-model="passwordData.repeatenewpassword" />
        </div>
        <div class="w-full p-2">
            <vs-button @click="submitfunc" class="!mt-3" color="#003a36" type="filled">تغییر کلمه عبور</vs-button>
        </div>
    </div>
</template>

<style >
.vs-con-input {
    margin-top: 10px;
}

.vs-input--icon-validate {
    padding: 0 10px;
}

.vs-input--input:focus {
    outline: none;
}

.span-text-validation {
    font-size: 0.8rem;
}
</style>