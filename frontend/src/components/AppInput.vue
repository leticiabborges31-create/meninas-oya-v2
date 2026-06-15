<template>
  <div class="app-field">
    <label v-if="label" class="app-label">
      {{ label }}
      <span v-if="required" class="required-star" aria-hidden="true">*</span>
    </label>

    <div class="app-input-wrap" :class="{ 'has-error': error, 'has-prefix': $slots.prefix, 'has-suffix': $slots.suffix }">
      <span v-if="$slots.prefix" class="input-slot prefix">
        <slot name="prefix" />
      </span>

      <input
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        class="app-input"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <span v-if="$slots.suffix" class="input-slot suffix">
        <slot name="suffix" />
      </span>
    </div>

    <p v-if="error" class="app-field-error">{{ error }}</p>
    <p v-else-if="hint" class="app-field-hint">{{ hint }}</p>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  inheritAttrs: false,
  props: {
    label:       { type: String,  default: '' },
    modelValue:  { type: [String, Number], default: '' },
    type:        { type: String,  default: 'text' },
    placeholder: { type: String,  default: '' },
    required:    { type: Boolean, default: false },
    disabled:    { type: Boolean, default: false },
    error:       { type: String,  default: '' },
    hint:        { type: String,  default: '' }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.app-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.app-label {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--oya-stone);
}

.required-star { color: var(--oya-ember); margin-left: 2px; }

.app-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.app-input {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1.5px solid var(--oya-fog);
  border-radius: var(--radius-md);
  background: #FAFAF8;
  color: var(--oya-char);
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  outline: none;
}

.app-input:focus {
  border-color: rgba(217, 79, 30, 0.5);
  box-shadow: 0 0 0 3px rgba(217, 79, 30, 0.08);
  background: #fff;
}

.app-input:disabled {
  background: var(--oya-bg);
  color: var(--oya-silver);
  cursor: not-allowed;
}

.has-error .app-input {
  border-color: rgba(217, 79, 30, 0.5);
}

.has-error .app-input:focus {
  box-shadow: 0 0 0 3px rgba(217, 79, 30, 0.08);
}

.has-prefix .app-input { padding-left: 2.8rem; }
.has-suffix .app-input { padding-right: 2.8rem; }

.input-slot {
  position: absolute;
  display: flex;
  align-items: center;
  color: var(--oya-silver);
  pointer-events: none;
}
.input-slot.prefix { left: 0.9rem; }
.input-slot.suffix { right: 0.9rem; }

.app-field-error {
  font-size: 0.75rem;
  color: var(--oya-ember);
  margin: 0;
}

.app-field-hint {
  font-size: 0.75rem;
  color: var(--oya-steel);
  margin: 0;
}
</style>
