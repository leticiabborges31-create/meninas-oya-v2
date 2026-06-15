<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['app-btn', `app-btn--${variant}`, { 'app-btn--full': full, 'app-btn--loading': loading }]"
    v-bind="$attrs"
  >
    <svg v-if="loading" class="btn-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  inheritAttrs: false,
  props: {
    variant:  { type: String,  default: 'primary' }, // primary | secondary | danger | ghost
    type:     { type: String,  default: 'button' },
    loading:  { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    full:     { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  border: none;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s, opacity 0.15s;
  white-space: nowrap;
}

.app-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.app-btn--full { width: 100%; }

/* PRIMARY — forest green */
.app-btn--primary {
  background: var(--oya-forest);
  color: var(--oya-mint);
  box-shadow: 0 6px 18px rgba(26, 58, 42, 0.18);
}
.app-btn--primary:not(:disabled):hover {
  background: var(--oya-sage);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(26, 58, 42, 0.22);
}

/* SECONDARY — ember orange */
.app-btn--secondary {
  background: var(--oya-ember);
  color: #fff;
  box-shadow: 0 6px 18px rgba(217, 79, 30, 0.22);
}
.app-btn--secondary:not(:disabled):hover {
  background: var(--oya-flame);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(217, 79, 30, 0.28);
}

/* DANGER */
.app-btn--danger {
  background: rgba(217, 79, 30, 0.08);
  color: var(--oya-ember);
  border: 0.5px solid rgba(217, 79, 30, 0.2);
}
.app-btn--danger:not(:disabled):hover {
  background: rgba(217, 79, 30, 0.14);
}

/* GHOST — outlined */
.app-btn--ghost {
  background: transparent;
  color: var(--oya-sage);
  border: 1.5px solid var(--oya-fog);
}
.app-btn--ghost:not(:disabled):hover {
  background: rgba(74, 122, 98, 0.06);
}

/* Spinner */
.btn-spinner {
  width: 1rem;
  height: 1rem;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
