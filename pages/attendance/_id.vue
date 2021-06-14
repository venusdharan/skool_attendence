<template>
  <div class="padding:1%;">
    <v-row>
      <v-col>
        <v-card>
          <div id='element-to-print' v-if="class_data.data">
            <v-card-title><span>Class:{{ class_data.data.class_name}}</span><v-spacer></v-spacer><span> Teacher:{{ class_data.data.class_teacher}}</span></v-card-title>
            <div v-if="class_data.data.class_date">
            <v-card-subtitle >Date: {{new Date(class_data.data.class_date).toLocaleDateString("en-GB") == "Invalid Date" ? "No Date" : new Date(class_data.data.class_date).toLocaleDateString("en-GB")}}</v-card-subtitle>
            </div>
            <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Name
                      </th>
                      <th class="text-left">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in class_data.attend"
                      :key="item._id"
                    >
                      <td>{{ item.student_name }}</td>
                      <td>{{new Date(item.class_created).toLocaleDateString("en-GB") }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </div>

          <v-card-actions>
            <v-btn @click="generate_enquiry">Export to PDF</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import html2pdf from 'html2pdf-jspdf2'
export default {
  data() {
    return {
      class_data:{}
    }
  },
  components:{

},
  async created() {
    try {
      console.log(this.$route.params.id)
          var project_details = await this.$axios.get('/api/class/attend/'+this.$route.params.id);

        if(project_details.status == 200){
          console.log(project_details.data)
          this.class_data = project_details.data;
        }

    } catch (error) {

    }

  },
  methods: {
    async generate_enquiry(){
      var element = document.getElementById('element-to-print')
            html2pdf(element, {
					margin: 1,
					filename: "class_attendance"+this.class_data.class_name + '.pdf',
					image: { type: 'jpeg', quality: 0.98 },
					html2canvas: { dpi: 192, letterRendering: true },
					jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait' }
				})
    },
    async generate_invoice(){

    }
  },
}
</script>
