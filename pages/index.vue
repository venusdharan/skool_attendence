<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <v-card>
        <v-card-title class="headline">
          Class Creator
        </v-card-title>
        <v-card-text>
          <v-text-field label="Video Link" v-model="class_url"></v-text-field>
          <v-text-field label="Class Title" v-model="class_name"></v-text-field>
          <v-text-field label="Teacher Name" v-model="class_teacher"></v-text-field>
          <v-datetime-picker label="Select Datetime" v-model="datetime">
            <template slot="dateIcon">
                                <v-icon>mdi-calendar-range</v-icon>
                            </template>
                            <template slot="timeIcon">
                                <v-icon>mdi-clock-outline</v-icon>
                            </template>
          </v-datetime-picker>
        </v-card-text>
        <v-card-actions>

          <v-btn
            color="primary"
            @click="create_class"
          >
            Create Class
          </v-btn>
        </v-card-actions>
        <v-banner
        v-if="class_link"

        >
         Class Link : {{class_link}}

          <template v-slot:actions>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="copy_link"
            >
              Click to copy
            </v-btn>
          </template>
        </v-banner>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {

  },
  methods: {
    async create_class(){
      var data = {
        class_date:this.datetime,
        class_url:this.class_url,
        class_name:this.class_name,
        class_teacher:this.class_teacher,

      }
      var res = await this.$axios.post('/api/class',data);
      if(res.status == 200){
        var class_ = "https://compassinstitute.site/class?class_id="+res.data._id;
        this.class_link = class_;
      }

    },
    async copy_link(){
      var text = this.class_link;
      navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
        alert("Class link copied !");
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
  },
  created() {

  },
  data() {
    return {
      datetime:null,
      class_url:"",
      class_name:"",
      class_teacher:"",
      class_link:""

    }
  },
}
</script>
