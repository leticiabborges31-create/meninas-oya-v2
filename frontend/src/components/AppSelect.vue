<template>
  <div class="app-field">
    <label v-if="label" class="app-label">
      {{ label }}
      <span v-if="required" class="required-star" aria-hidden="true">*</span>
    </label>

    <div class="app-select-wrap" :class="{ 'has-error': error }">
      <select
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        class="app-select"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
        >{{ opt.label }}</option>
      </select>

      <!-- chevron -->
      <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>

    <p v-if="error" class="app-field-error">{{ error }}</p>
    <p v-else-if="hint" class="app-field-hint">{{ hint }}</p>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    label:       { type: String,  default: '' },
    modelValue:  { type: String,  default: '' },
    options:     { type: Array,   required: true },
    placeholder: { type: String,  default: 'Selecione...' },
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

.app-select-wrap { position: relative; }

.app-select {
  width: 100%;
  padding: 0.9rem 2.5rem 0.9rem 1rem;
  border: 1.5px solid var(--oya-fog);
  border-radius: var(--radius-md);
  background: #FAFAF8;
  color: var(--oya-char);
  font-family: var(--font-body);
  font-size: 0.9rem;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  outline: none;
}

.app-select:focus {
  border-color: rgba(217, 79, 30, 0.5);
  box-shadow: 0 0 0 3px rgba(217, 79, 30, 0.08);
  background: #fff;
}

.app-select:disabled {
  background: var(--oya-bg);
  color: var(--oya-silver);
  cursor: not-allowed;
}

.has-error .app-select {
  border-color: rgba(217, 79, 30, 0.5);
}

.select-arrow {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: var(--oya-silver);
  pointer-events: none;
}

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
