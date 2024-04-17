<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue';
import { useGlobalStore } from '@/stores/global';
import { onBeforeMount, reactive, ref } from 'vue';
import { useTypeStore } from '../stores/type';
import { storeToRefs } from 'pinia';
import { payloadLodgingSchema } from '../schemas/lodging-schema';
import { ZodError } from 'zod';
import swal from 'sweetalert';
import router from '@/router';
import { useRoute } from 'vue-router';

const globalStore = useGlobalStore();
const typeStore = useTypeStore();
const route = useRoute();

const { types } = storeToRefs(typeStore);
const { request, setLoader, validate, setError, clearError } = globalStore;

const form = reactive({
  name: '',
  facility: '',
  roomCapacity: '',
  imgUrl: '',
  location: '',
  price: '',
  TypeId: ''
});

const fieldError = reactive({
  name: {
    msg: '',
    error: false
  },
  facility: {
    msg: '',
    error: false
  },
  roomCapacity: {
    msg: '',
    error: false
  },
  imgUrl: {
    msg: '',
    error: false
  },
  price: {
    msg: '',
    error: false
  },
  location: {
    msg: '',
    error: false
  },
  TypeId: {
    msg: '',
    error: false
  }
});

async function update(id: string) {
  setLoader(true);
  clearError(fieldError);

  try {
    const payload = validate(payloadLodgingSchema, form);

    await request({
      method: 'PATCH',
      url: `/lodgings/${route.params.id}`,
      data: payload,
      headers: {
        access_token: localStorage.access_token
      }
    });

    setLoader(false);
    swal('Successfully', 'Update Lodging Successfully', 'success');
    router.push('/lodgings/');
  } catch (error) {
    console.log(error);
    setLoader(false);
    swal('Failed', 'Update Lodging Failed', 'error');

    if (error instanceof ZodError) {
      setError(fieldError, error.flatten().fieldErrors as any);
    }
  }
}

async function create() {
  setLoader(true);
  clearError(fieldError);

  try {
    const payload = validate(payloadLodgingSchema, form);

    await request({
      method: 'POST',
      url: '/lodgings',
      headers: {
        access_token: localStorage.access_token
      },
      data: payload
    });

    setLoader(false);
    swal('Successfully', 'Create Lodging Successfully', 'success');
    router.push('/lodgings');
  } catch (error) {
    console.log(error);
    setLoader(false);

    if (error instanceof ZodError) {
      setError(fieldError, error.flatten().fieldErrors as any);
    }
  }
}

onBeforeMount(async () => {
  setLoader(true);

  try {
    const { data } = await request({
      method: 'GET',
      url: '/types',
      headers: {
        access_token: localStorage.access_token
      }
    });

    types.value = data;

    if (route.params.id) {
      const responseLodging = await request({
        method: 'GET',
        url: `/lodgings/${route.params.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      });

      const { name, facility, roomCapacity, imgUrl, price, location, TypeId } =
        responseLodging.data;

      form.name = name;
      form.facility = facility;
      form.roomCapacity = roomCapacity;
      form.imgUrl = imgUrl;
      form.price = price;
      form.location = location;
      form.TypeId = TypeId;
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoader(false);
  }
});
</script>

<template>
  <section class="main-content">
    <h1 class="title">{{ route.params.id ? 'Edit' : 'Create' }} Lodging</h1>
    <div class="card">
      <form
        @submit.prevent="route.params.id ? update(route.params.id as string) : create()"
        autocomplete="off"
      >
        <div class="form-input">
          <label for="name">Name</label>
          <InputComponent
            type="text"
            name="name"
            v-model="form.name"
            :is-invalid="fieldError.name.error"
          />
          <div v-show="fieldError.name.error" class="invalid-feedback">
            {{ fieldError.name.msg }}
          </div>
        </div>
        <div class="form-input">
          <label for="faciltiy">Facility</label>
          <InputComponent
            type="text"
            name="facility"
            v-model="form.facility"
            :is-invalid="fieldError.facility.error"
          />
          <div v-show="fieldError.facility.error" class="invalid-feedback">
            {{ fieldError.facility.msg }}
          </div>
        </div>
        <div class="form-input">
          <label for="roomCapacity">Room Capacity</label>
          <InputComponent
            type="number"
            name="roomCapacity"
            v-model="form.roomCapacity"
            :is-invalid="fieldError.roomCapacity.error"
          />
          <div v-show="fieldError.roomCapacity.error" class="invalid-feedback">
            {{ fieldError.roomCapacity.msg }}
          </div>
        </div>
        <div class="form-input">
          <label for="imgUrl">Image</label>
          <InputComponent
            type="url"
            name="imgUrl"
            v-model="form.imgUrl"
            :is-invalid="fieldError.imgUrl.error"
          />
          <div v-show="fieldError.imgUrl.error" class="invalid-feedback">
            {{ fieldError.imgUrl.msg }}
          </div>
        </div>
        <div class="form-input">
          <label for="location">Location</label>
          <InputComponent
            type="text"
            name="location"
            v-model="form.location"
            :is-invalid="fieldError.location.error"
          />
          <div v-show="fieldError.location.error" class="invalid-feedback">
            {{ fieldError.location.msg }}
          </div>
        </div>
        <div class="form-input">
          <label for="price">Price</label>
          <InputComponent
            type="number"
            name="price"
            v-model="form.price"
            :is-invalid="fieldError.price.error"
          />
          <div v-show="fieldError.price.error" class="invalid-feedback">
            {{ fieldError.price.msg }}
          </div>
        </div>
        <div class="form-input">
          <label for="TypeId">Type</label>
          <select
            name="TypeId"
            id="TypeId"
            v-model="form.TypeId"
            :class="{ 'is-invalid': fieldError.TypeId.error }"
          >
            <option value="">--Select Type--</option>
            <option v-for="type in types" :key="type.id" :value="type.id">
              {{ type.name }}
            </option>
          </select>
          <div v-show="fieldError.TypeId.error" class="invalid-feedback">
            {{ fieldError.TypeId.msg }}
          </div>
        </div>
        <div class="form-button">
          <RouterLink to="/lodgings" class="btn btn-warning">Cancel</RouterLink>
          <button type="submit" class="btn btn-success">Submit</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
  min-height: 90px;
  justify-content: space-between;
  margin-bottom: 10px;
}

.form-button {
  margin-top: 10px;
}

.form-input label {
  color: #31363f;
}

.card {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
}

select {
  border: none;
  padding: 20px;
  background-color: #f8fae5;
  border-radius: 5px;
  outline: none;
}

select option {
  background-color: white;
  font-size: 17px;
}

select:focus {
  background-color: lightblue;
  border: 1px solid #90d26d;
}
</style>
