import SpinnerMini from "../components/SpinnerMini";
import { Controller } from "react-hook-form";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";

export default function UserInfoForm({
  onSubmit,
  formMessage,
  isLoading,
  type,
  form,
  include = "all",
  customTitle = "",
  isDisabled = () => false,
  children,
}) {
  const isCreate = type === "create";
  return (
    <div className="main-form">
      <h2 className="heading-secondary ma-bt-lg">
        {customTitle || (isCreate ? "create account" : "edit account")}
      </h2>
      <form className="form form--main" onSubmit={form.handleSubmit(onSubmit)}>
        {include === "general" && (
          <UserGeneralForm
            isLoading={isLoading}
            form={form}
            isCreate={isCreate}
            isDisabled={isDisabled}
          />
        )}
        {include === "all" && (
          <>
            <UserGeneralForm
              isLoading={isLoading}
              form={form}
              isCreate={isCreate}
              isDisabled={isDisabled}
            />
            <UserPasswordForm
              isLoading={isLoading}
              form={form}
              isCreate={isCreate}
            />
          </>
        )}
        {include === "password" && (
          <UserPasswordForm
            isLoading={isLoading}
            form={form}
            isCreate={isCreate}
          />
        )}
        {formMessage}
        <div className="form__group">
          <button type="submit" className="btn btn--green" disabled={isLoading}>
            {isLoading ? <SpinnerMini /> : isCreate ? "sign up" : "save"}
          </button>
        </div>
      </form>
      {children}
    </div>
  );
}

function UserGeneralForm({ isLoading, form, isCreate, isDisabled }) {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = form;
  return (
    <>
      <div className="form__group">
        <label className="form__label" htmlFor="fullName">
          Full Name
        </label>
        <input
          className={`form__input ${!isCreate ? "edit-general__input" : ""}`}
          id="fullName"
          type="text"
          disabled={isLoading || isDisabled("fullName")}
          maxLength={30}
          required
          {...register("fullName")}
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="email">
          Email (not requred if you provide phone number)
          <span>{errors?.email?.message}</span>
        </label>
        <input
          className="form__input"
          id="email"
          type="email"
          disabled={isLoading || isDisabled("email")}
          {...register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
            validate: (value) =>
              Boolean(value || getValues().phone) ||
              "at least 1 contact info is required",
          })}
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="phone">
          Phone Number (not requred if you provide email)
          <span>{errors?.phone?.message}</span>
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{
            validate: (value) =>
              value
                ? isValidPhoneNumber(value) ||
                  "Please provide a valid phone number"
                : true,
          }}
          render={({ field: { value } }) => (
            <PhoneInput
              id="phone"
              className="phone__input"
              defaultCountry="af"
              disableDialCodePrefill={true}
              disabled={isLoading || isDisabled("phone")}
              value={value}
              onChange={(e) => setValue("phone", e, { shouldValidate: true })}
            />
          )}
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="userName">
          {isCreate && "Create"} User Name (Lowercase, min 3 - max 20)
          <span>{errors?.userName?.message}</span>
        </label>
        <input
          autoCorrect="off"
          autoCapitalize="none"
          className={`form__input ${!isCreate ? "edit-general__input" : ""}`}
          id="userName"
          type="text"
          disabled={isLoading || isDisabled("userName")}
          required
          minLength={3}
          maxLength={20}
          {...register("userName", {
            pattern: {
              value: /^[^@ ]*$/,
              message: "don't use @ or space in userName",
            },
            validate: (value) =>
              value === value.toLowerCase() || "use lower cases",
          })}
        />
      </div>
    </>
  );
}

function UserPasswordForm({ isLoading, form, isCreate }) {
  const {
    register,
    getValues,
    formState: { errors },
  } = form;
  return (
    <>
      <div className="form__group">
        <label className="form__label" htmlFor="password">
          Create {!isCreate && "new"} Password (min 6)
        </label>
        <input
          className="form__input"
          id="password"
          type="password"
          disabled={isLoading}
          required
          minLength={6}
          {...register("password")}
        />
      </div>
      <div className="form__group">
        <label className="form__label" htmlFor="passwordConfirm">
          Confirm {!isCreate && "new"} Password
          <span>{errors?.passwordConfirm?.message}</span>
        </label>
        <input
          className="form__input"
          id="passwordConfirm"
          type="password"
          disabled={isLoading}
          required
          {...register("passwordConfirm", {
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </div>
    </>
  );
}
