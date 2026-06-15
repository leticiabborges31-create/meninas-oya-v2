<template>
  <div class="cidade-select">
    <label v-if="label" :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      type="text"
      v-model="busca"
      :placeholder="placeholder"
      autocomplete="off"
      @input="onInput"
      @focus="mostrarLista = true"
      @blur="onBlur"
    />
    <ul v-if="mostrarLista && resultados.length" class="cidade-dropdown">
      <li
        v-for="cidade in resultados"
        :key="cidade.id"
        @mousedown.prevent="selecionar(cidade)"
      >
        {{ cidade.nome }} / {{ cidade.uf }}
        <span class="regiao-badge">{{ cidade.regiao }}</span>
      </li>
    </ul>
    <p v-if="mostrarLista && buscou && !resultados.length" class="cidade-vazia">
      Nenhuma cidade encontrada.
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getCidades } from '@/service/api'

const props = defineProps({
  modelValue: { type: Number, default: null },
  label:      { type: String, default: '' },
  placeholder:{ type: String, default: 'Digite o nome da cidade...' },
  inputId:    { type: String, default: 'cidade-select' }
})

const emit = defineEmits(['update:modelValue', 'cidade-selecionada'])

const busca       = ref('')
const resultados  = ref([])
const mostrarLista= ref(false)
const buscou      = ref(false)
let debounceTimer = null

// Se o componente recebe um valor inicial com nome (objeto cidade), exibe o nome
watch(() => props.modelValue, (val) => {
  if (!val) busca.value = ''
})

function onInput() {
  clearTimeout(debounceTimer)
  buscou.value = false
  debounceTimer = setTimeout(buscar, 300)
}

async function buscar() {
  if (busca.value.trim().length < 2) {
    resultados.value = []
    return
  }
  try {
    const res = await getCidades({ q: busca.value.trim() })
    resultados.value = res.data.slice(0, 12) // limita a 12 sugestões
    buscou.value = true
    mostrarLista.value = true
  } catch {
    resultados.value = []
  }
}

function selecionar(cidade) {
  busca.value = `${cidade.nome} / ${cidade.uf}`
  resultados.value = []
  mostrarLista.value = false
  emit('update:modelValue', cidade.id)
  emit('cidade-selecionada', cidade)
}

function onBlur() {
  setTimeout(() => { mostrarLista.value = false }, 150)
}
</script>

<style scoped>
.cidade-select {
  position: relative;
}
.cidade-select label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 4px;
  font-weight: 500;
}
.cidade-select input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  box-sizing: border-box;
}
.cidade-dropdown {
  position: absolute;
  z-index: 999;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  list-style: none;
  margin: 2px 0 0;
  padding: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
}
.cidade-dropdown li {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}
.cidade-dropdown li:hover {
  background: #f5f5f5;
}
.regiao-badge {
  font-size: 0.72rem;
  background: #7b2d8b;
  color: #fff;
  border-radius: 4px;
  padding: 1px 5px;
  font-weight: 600;
  margin-left: auto;
}
.cidade-vazia {
  font-size: 0.85rem;
  color: #888;
  padding: 6px 0;
}
</style>
