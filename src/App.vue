<template> 
<div id="plugintable">
<b-container fluid> 
     <b-row class="justify-content-end">
      <b-col   >
        <b-form-group  >
          <b-input-group>
            <b-form-input v-model="filter" placeholder="搜索" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear
              </b-button> 
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col> 

     <b-col  class="m-2"  >
    共：310 个  <span v-if="totalRows"> 已过滤：{{ totalRows }}</span> 
    </b-col>
  
    </b-row>
<div v-if="waiting"  class="d-flex justify-content-center mb-3">
   <b-spinner   style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
</div>

<b-table
    :busy="isBusy"
    small
    bordered
    responsive
    head-variant="dark"
    foot-clone
    foot-variant="dark"
    stacked="md" 
    show-empty
    :items="items"
    :fields="fields"
    :filter="filter"
    @filtered="onFiltered"
    :tbody-tr-class="inuseClass"
    >

  <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>


<template slot="title" slot-scope="row"  >
<div class="row no-gutters ">
  <div class="col-2 text-center">
    <b-img-lazy fluid
      style="width: 38px; height: 38px;"               
      :src="`${row.item.icon}`"       
    />
  </div>
  <div class="col-10"  >
    <p class="text-truncate" style="max-width: 400px;">
      <b-link 
          :href="`http://wordpress.org/plugins/${row.item.slug}`" target="blank">{{ row.item.title }}   
      </b-link>
    </p>
  </div>
</div>
</template>
   

<template slot="index" slot-scope="row">
 <center> {{ row.index + 1 }} </center>
</template>
 
<template slot="tested" slot-scope="row" >
<span class="dashicons dashicons-wordpress-alt "></span> {{ row.item.tested }} 
</template>

<template slot="HEAD_title" slot-scope="data">
  <center>{{ data.label }}</center>
</template>
<template slot="HEAD_downloaded" slot-scope="data">
  <center>{{ data.label }}</center>
</template>
 

<template slot="actions" slot-scope="row">
  <b-button  variant="outline-info"   :pressed="false" size="sm" @click="row.toggleDetails">
    <span v-if="row.detailsShowing"  class="dashicons dashicons-arrow-up-alt2"></span>
    <span v-else  class="dashicons dashicons-arrow-down-alt2" ></span>    
  </b-button>
</template>

<template slot="row-details" slot-scope="row"> 
<b-card-group deck >
<b-card  
  bg-variant="light" 
  border-variant="light"
  class=" bg-transparent "
 >
<b-card-title class="mt-3 pl-5 text-justify" >
   {{row.item.name}}

</b-card-title>

  <b-card-text>
    <p class="mt-3 pl-5 text-justify" v-html= " row.item.description "></p>
  </b-card-text>            
</b-card> 

<b-card
  bg-variant="light" 
  border-variant="light"
  class="p-0 m-0 bg-transparent ">
<b-card-text >

<dl class="row">
  <dt class="col-sm-2   ">主页：</dt>
  <dd class="col-sm-10"> <b-link       
        :href="`http://wordpress.org/plugins/${row.item.slug}`" 
        target="blank">http://wordpress.org/plugins/{{ row.item.slug }}
        </b-link></dd>

  <dt class="col-sm-2   ">作者：</dt>
  <dd class="col-sm-10">
      <p   v-html="row.item.author"></p>
   </dd>

  <dt class="col-sm-2  ">Tags：</dt>
  <dd class="col-sm-10 d-inline ">  
        <b-link  
          class="pr-2"   
          v-for="tag in row.item.tags"
          :href="`http://wordpress.org/plugins/tags/${tag}`" 
          target="blank">{{ tag }}
        </b-link>  
</dd>

  
   
</dl>
</b-card-text>
</b-card> 

 </b-card-group>
</template>

</b-table>
 <b-row class="justify-content-end">
      <b-col   >
        <b-form-group  >
          <b-input-group>
            <b-form-input v-model="filter" placeholder="搜索" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear
              </b-button> 
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col> 

     <b-col  class="m-2"  >
    共：310 个  <span v-if="totalRows"> 已过滤：{{ totalRows }}</span> 
    </b-col>
  
    </b-row>
</b-container>
</div>
</template>

<script>
import axios from 'axios';
const inuseplugins=[
                    "advanced-custom-fields",
                    "atomic-blocks",
                    "content-cards",
                    "display-posts-shortcode",
                    "duplicate-post",
                    "duplicator",
                    "ewww-image-optimizer",
                    "simple-image-sizes",
                    "we-blocks",
                    "wp-statistics",
                    "wordpress-seo"
                    ]
  export default {
    data() {
      return {
        isBusy: false,
        items:[],
        fields: [
                  {key:'index',label:''},
                  // { key: 'name', label: '插件名称', sortable: true,class:"w-40" },
                  { key: 'title', label: '插件名称', sortable: true,class:"w-40" },
                  { key: 'downloaded', label: '下载', sortable: true, class: 'text-nowrap text-right small pr-2' },
                  { key: 'num_ratings', label: '评分人数', sortable: true, class: 'text-nowrap text-center small' },
                  { key: 'rating', label: '评分', sortable: true, class: 'text-nowrap text-center small' },
                  { key: 'tested', label: '测试通过', sortable: true, class: 'text-nowrap text-left small pl-2' },
                  { key: 'last_updated_date', label: '上次更新', sortable: true, class: 'text-nowrap text-center small' },
              
                  { key: 'actions', label: '' },
                ], 
        totalRows: null,
        filter: null,
      }
    },
    methods: {
 
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
      },
      
      inuseClass(item) {
        if (!item) return
        if ( inuseplugins.includes(item.slug)) return 'table-success'
      },

       getplugins(){
        this.isBusy = true
        // axios.get('/dist/result.json').then(response => {
        axios.get('/wp-content/themes/genesis-sample/plugin-tables/dist/result.json').then(response => {
        this.items = response.data
        this.isBusy = false
                });
      }
    
     
    },
    mounted:function () {
         this.getplugins();
    }
  }
</script>
<style> 
</style>