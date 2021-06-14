<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                     <!--v-simple-table>
                        v-on:update:page="update_data"
                        v-on:update:options="update_options"
                      </v-simple-table-->
                        <v-data-table
                        :headers="headers"
                        :items="TableData"
                        :options.sync="options"
                        :server-items-length="totalCount"
                        :loading="loading"
                        :search="search"
                        :pagination.sync="pagination"
                        class="elevation-1"
                        item-key="_id"
                        disable-sort
                      >


                      <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title>Class</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <!--v-btn class="white--text" color="green" @click="get_export">EXPORT</v-btn-->
                        <!--a class="v-btn" :href="export_url" target="_blank">Export</a-->
                        <!--v-spacer></v-spacer>
                        <v-datetime-picker class="white--text" dark label="Task Date" v-model="datetime" >
                            <template slot="dateIcon">
                                <v-icon>mdi-calendar-range</v-icon>
                            </template>
                            <template slot="timeIcon">
                                <v-icon>mdi-clock-outline</v-icon>
                            </template>
                        </v-datetime-picker>
                        <v-spacer></v-spacer>
                        <v-select
                        :items="teams"
                        label="Select Teams"
                        item-text="team_name"
                        v-model="team_selected"
                        dense
                        >
                        </v-select>
                        <v-btn v-if="team_selected != ''" icon @click="team_selected = '' ">
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-select
                        :items="vehicle_types"
                        item-text="vehicle_type"
                        label="Select Vehicle Type"
                        v-model="vehicle_selected"
                        dense
                        >
                        </v-select>
                         <v-btn v-if="vehicle_selected != ''" icon @click="vehicle_selected = '' ">
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn-->
                        <v-spacer></v-spacer>

                        <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search by Order #"
                        single-line
                        clearable
                        hide-details
                        placeholder="Search by Order #"
                      ></v-text-field>
                       <v-spacer></v-spacer><!--v-btn icon color="red" @click="load_data"><v-icon>mdi-refresh-circle</v-icon></v-btn-->
                        </v-toolbar>
                        </template>


                      <template v-slot:item.class_created="{ item }">
                          <td>
                            {{new Date(item.class_created).toLocaleDateString("en-GB") == "Invalid Date" ? "No Date" : new Date(item.class_created).toLocaleDateString("en-GB")}}
                          </td>
                      </template>

                      <template v-slot:item.created_date="{ item }">
                          <td>
                            {{new Date(item.created_date).toLocaleDateString("en-GB") == "Invalid Date" ? "No Date" : new Date(item.created_date).toLocaleDateString("en-GB")}}
                          </td>
                      </template>

                      <template v-slot:item.class_date="{ item }">
                          <td>
                            {{new Date(item.class_date).toLocaleDateString("en-GB") == "Invalid Date" ? "No Date" : new Date(item.class_date).toLocaleDateString("en-GB")}}
                          </td>
                      </template>




                      <template v-slot:item.info_arrow="{ item }">
                          <td >
                          <v-btn icon :to="'/attendance/'+item._id"><v-icon >mdi-arrow-right-bold</v-icon></v-btn>
                          </td>
                      </template>


                      <template v-slot:no-data>
                        <v-btn
                          color="primary"
                          @click="update_options"
                        >
                          Reset
                        </v-btn>
                      </template>
                      </v-data-table>
                </v-col>
            </v-row>
            <v-row>

            </v-row>
        </v-container>
       </div>
</template>

<script>

  export default {
    data: () => ({
      search:"",
      expanded: [],
      dialog: false,
      dialogDelete: false,
      selected_item:null,
      selected_item_index:null,
      details_pick:false,
      agent_marker_dialog : false,
      agent_marker_details : false,
      payment_dialog :false,
      payment_details:false,
      payment_tabs:null,
      headers: [
      {
        text: 'Class name',
        align: 'start',
        sortable: false,
        value: 'class_name',
      },
      {
        text: 'Teacher',
        align: 'start',
        sortable: false,
        value: 'class_teacher'
      },
      {
        text: 'Date of Class',
        align: 'start',
        sortable: false,
        value: 'class_date',
      },
      {
        text: 'Link',
        align: 'start',
        sortable: false,
        value: 'class_url'
      },
      { text: 'Created Date',
        align: 'start',
        sortable: false,
        value: 'class_created'
      },
      { text: 'Attendance',
        align: 'start',
        sortable: false,
        value: 'info_arrow'
      },


    ],
    TableData: [],
    totalCount:0,
    loading: true,
    options: {

    },

    teams:[],
    team_selected:"",
    vehicle_types:[],
    vehicle_selected:"",
    export_url:"redglee.co.in" ,
    }),

    computed:{

    },
    methods: {

      async load_data(){
        //try{
        this.loading = true;
        //var teams_all = await this.$axios.get('/api/team/all');
        //this.teams = teams_all.data;
        //this.team_selected = teams_all.data[0].team_name;
        //var vehicle_all = await this.$axios.get('/api/vehicle/all');
        //this.vehicle_types = vehicle_all.data;
        //this.vehicle_selected = vehicle_all.data[0].vehicle_type

        var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        }
        var res = await this.$axios.get("/api/class/datatable/",{ params:table_options});
        res = res.data;
        console.log(res.data)
        console.log("res.data")
        if(res.status == false) return;
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;

        /*}catch(err){
          console.log("E::A")
          this.loading = false;
        }*/
      },
      async pagination(val){
         var table_options = {
        items_perpage : val.options.itemsPerPage,
        page:val.options.page,
        }
        if(this.search){
          table_options.search = this.serach;
        }
        try{
        this.loading = true;
          var res = await this.$axios.get("/api/class/datatable/",{ params:table_options});
        res = res.data;
        console.log(res.data)
        if(res.status == false) return;
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
        }
      },
      async update_data(val){
         var table_options = {
        items_perpage : val.options.itemsPerPage,
        page:val.options.page,
        }
        if(this.search){
          table_options.search = this.serach;
        }
        try{
        this.loading = true;
          var res = await this.$axios.get("/api/class/datatable/",{ params:table_options});
        res = res.data;
        console.log(res.data)
        if(res.status == false) return;
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
        }
      },
      async update_options(val){
       // console.log(val)


        try{
            var table_options = {
        items_perpage : val.options.itemsPerPage,
        page:val.options.page,
        }
        if(this.search){
          table_options.search = this.serach;
        }
        this.loading = true;
          var res = await this.$axios.get("/api/class/datatable/",{ params:table_options});
        res = res.data;
        console.log(res.data)
        if(res.status == false) return;
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
        }
      }
    },
    watch: {

    async search(val){
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        search:val
      }

      try{
      this.loading = true;

        var res = await this.$axios.get("/api/class/datatable/",{ params:table_options});
        res = res.data;
        console.log(res.data)
        if(res.status == false) return;
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
          this.loading = false;
        }

    },
     options: {
        async handler (val) {

        var table_options = {
          items_perpage : val.itemsPerPage,
          page:val.page
        }
        if(this.search){
          table_options.search = this.serach;
        }
        console.log(this.master_team_store)
        //try{
          if(this.master_team_store){
        this.loading = true; //getMasterTeam //master_team_store
        var res = await this.$axios.get("/api/class/datatable/",{ params:table_options});
        res = res.data;
        console.log(res.data)
        if(res.status == false) return;
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
          }

        this.loading = false;
        /*}catch(err){
          console.log("E::A")
          this.loading = false;
        } */
        },
        deep: true,
      },
    },

    async mounted () {
        //var res = await this.$axios.get('/api/manager/all');
        //console.log(res.data);
        //await this.$gmapApiPromiseLazy();
       this.load_data()

          // console.log(this.$auth.getToken('local'));

    },

  }
</script>

<style>
.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
  box-shadow: inset 0px 0px 0px -0px rgba(50, 50, 50, 0.75), inset 0px 0px 0px 0px rgba(50, 50, 50, 0.75) !important;
}
</style>
