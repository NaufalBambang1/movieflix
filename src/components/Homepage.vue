<template>
  <div class="pb-5">
    <section id="navbar" class="container-dqa pt-2 pb-2 pl-3 pr-3" style="background-color: rgb(18,18,18);">
      <div class="d-flex justify-space-between">
        <div class="logo">
          MOVIESFLIX
        </div>

        <div class="search-container hide-on-mobile">
          <input 
            type="text" 
            placeholder="Search.." 
            name="search"
            v-model="searchQuery" 
            @input="handleSearch"
            @keyup.enter="handleSearch">
          <button class="text-black pl-2 pr-2" type="submit" @click="handleSearch"><i class="fa fa-search"></i></button>
        </div>

        <div  class="show-on-mobile align-content-center">
          <i class="fa fa-search" id="toggleBar"></i>
        </div>
      </div>
      
      <div id="mobile-search" class="mt-3" style="display: none;">
        <div class="search-container-mobile d-flex justify-space-between" >
          <input 
            type="text" 
            placeholder="Search.." 
            name="search"
            v-model="searchQuery" 
            @input="handleSearch"
            @keyup.enter="handleSearch">
          <button class="text-black pl-2 pr-2" type="submit" @click="handleSearch"><i class="fa fa-search"></i></button>
        </div>
      </div>
    </section>

    <section v-if="!isSearching" id="content" class="container-dqa pl-3 pr-3">
      <!-- Movie Popular -->
      <div class="pt-4">
        <span class="fw-600 fs-24">Movie Terpopular di 2024</span>
        <swiper
          :slidesPerView="6"
          :spaceBetween="30"
          :modules="modules"
          :breakpoints="{
            320: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 25
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 30
            }
          }"
          class="mySwiper movie"
        >
          <swiper-slide 
            v-for="item in popularMovies.Search" 
            :key="item.imdbID" 
            style="cursor: pointer;"
            @click="openModal(item.imdbID)"
            >
            <div class="slide-content">
              <img :src="item.Poster" alt="item.Title" class="img-fluid">
              <span class="slide-title line-clamp-1 pa-1">{{ item.Title }}</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Rekomendasi 1 -->
      <div class="pt-4">
        <span class="fw-600 fs-24">Rekomendasi Deadpool Movies</span>
        <swiper
            :slidesPerView="6"
            :spaceBetween="30"
            :modules="modules"
            :breakpoints="{
              320: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 15
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 25
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 30
              }
            }"
            class="mySwiper movie"
          >
            <swiper-slide 
              v-for="item in deadpoolMovies.Search" 
              :key="item.imdbID" 
              style="cursor: pointer;"
              @click="openModal(item.imdbID)"
              >
              <div class="slide-content">
                <img :src="item.Poster" alt="item.Title" class="img-fluid">
                <span class="slide-title line-clamp-1 pa-1">{{ item.Title }}</span>
              </div>
            </swiper-slide>
        </swiper>
      </div>

      <!-- Rekomendasi 2 -->
      <div class="pt-4">
        <span class="fw-600 fs-24">Rekomendasi Naruto Movies & Series</span>
        <swiper
          :slidesPerView="6"
          :spaceBetween="30"
          :modules="modules"
          :breakpoints="{
            320: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 25
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 30
            }
          }"
          class="mySwiper movie"
        >
          <swiper-slide 
            v-for="item in narutoMoviesSeries.Search" 
            :key="item.imdbID" 
            style="cursor: pointer;"
            @click="openModal(item.imdbID)"
            >
            <div class="slide-content">
              <img :src="item.Poster" alt="item.Title" class="img-fluid">
              <span class="slide-title line-clamp-1 pa-1">{{ item.Title }}</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>

    <section v-else id="searchResult" class="container-dqa pl-3 pr-3" style="height: 93vh">
      <div  class="pt-4">
        <span class="fw-600 fs-24">Hasil Pencarian</span>
        <swiper
          :slidesPerView="6"
          :spaceBetween="30"
          :modules="modules"
          :breakpoints="{
            320: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 25
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 30
            }
          }"
          class="mySwiper movie"
        >
          <swiper-slide 
            v-for="item in searchResult.Search" 
            :key="item.imdbID" 
            style="cursor: pointer;"
            @click="openModal(item.imdbID)"
            >
            <div class="slide-content">
              <img :src="item.Poster" alt="item.Title" class="img-fluid">
              <span class="slide-title line-clamp-1 pa-1">{{ item.Title }}</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>

    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" class="close-button">&times;</button>
        <div v-if="isLoading">
          Loading...
        </div>
        <div v-else>
          <div class="d-flex ga-2 pt-3">
            <h2>{{ selectedMovie.Title }}</h2>
            <span class=" title-rated fs-17">{{ selectedMovie.Rated }}</span>
          </div>
          <div class="grid-box-2 ga-2 pt-2">
            <div>
              <img :src="selectedMovie.Poster" alt="selectedMovie.Title" class="img-fluid">
            </div>
            <div>
              <p class="pb-2">{{ selectedMovie.Plot }}</p>
              <div class="pb-2">
                <span class="fw-600">Dirlis: </span>
                <span>{{ selectedMovie.Released }}</span>&nbsp;
                <span class="fw-600">Waktu: </span>
                <span>{{ selectedMovie.Runtime }}</span>
              </div>
              <div class="pb-2">
                <span style="color:#777">Pemeran: </span>
                <span>{{ selectedMovie.Actors }}</span>
              </div>
              <div class="pb-2">
                <span style="color:#777">Genre: </span>
                <span>{{ selectedMovie.Genre }}</span>
              </div>
              <div class="pb-2">
                <span style="color:#777">Bahasa: </span>
                <span>{{ selectedMovie.Language }}</span>
              </div>
              <div class="pb-2">
                <span style="color:#777">Negara: </span>
                <span>{{ selectedMovie.Country }}</span>
              </div>
              <div class="pb-2">
                <span style="color:#777">Penulis: </span>
                <span>{{ selectedMovie.Writer }}</span>
              </div>
              <div>
                <span style="color:#777">Sutradara: </span>
                <span>{{ selectedMovie.Director }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default {
  components: {
      Swiper,
      SwiperSlide,
    },
  data () {
    return {
      modules: [Pagination],
      showModal: false,
      selectedMovie: null,
      isLoading: false,
      searchQuery: ''
    }
  },
  async mounted () {
    try{
      await this.getPopularMovies();
      await this.getDeadpoolMovies();
      await this.getNarutoMoviesSeries();
    }
    catch(error){
      console.log(error);
    }

    var toggleBars= this.$el.querySelector("#toggleBar")
    var mobileSearch = this.$el.querySelector("#mobile-search")

    toggleBars.addEventListener("click", function(){
      mobileSearch.style.display =(mobileSearch.style.display === 'none' || mobileSearch.style.display === '') ? 'block' : 'none';
    })
  },
  computed:{
    ...mapState(['popularMovies','deadpoolMovies','narutoMoviesSeries','searchResult', 'isSearching'])
  },
  methods:{
    ...mapActions(['getPopularMovies','getDeadpoolMovies','getNarutoMoviesSeries','getSearchResult','clearSearch','getMovieDetails']),
    async openModal(imdbID) {
      this.isLoading = true;
      this.showModal = true;
      try {
        this.selectedMovie = await this.getMovieDetails(imdbID);

      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    closeModal() {
      this.showModal = false;
      this.selectedMovie = null;
    },
    async handleSearch(){
      if (this.searchQuery.trim() === '') {
        this.clearSearch();
      } else {
        try {
          await this.getSearchResult(this.searchQuery);
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
}
</script>