var App = new Vue({
	el: '.container',

	data: {
		options: [],
		optionTypes: [
			{ text: 'Single Choice', value: 'SINGLE_CHOICE' },
			{ text: 'Multiple Choice', value: 'MULTPLE_CHOICE' },
		]
	},

	ready: function() {
		var self = this;

		// this.option = window.varname;
		self.fetchOptions();
	},

	methods: {

		disabledInput: function() {
			for(var i=0; i < this.options.length; i++){
				if(this.options[i].name == ""){
					$($(".selectize-control input")[i]).attr("disabled",true);
				}
				else{
					$($(".selectize-control input")[i]).attr("disabled",false);
				}
			}
		},
		fetchOptions: function() {
			var self = this;

			// TODO: Ajax call that fetchets all the options should be made here

			$.get('data.php', function(response){

				var response = JSON.parse(response)

				for(var i =0; i < response.length; i++){
					self.options.push(response[i]);
					self.doTimeOut(i);
				}
			})			
		},

		addNewOption: function() {
			var self = this;

			self.options.push({"name": "","required": false,"type": "","values": []});

			self.doTimeOut(self.options.length-1);
		},

		deleteOption: function(option) {
			var self = this;
			self.options.$remove(option);
		},

		getFormatedValues: function(values){
			var str = "";
			for(var i=0; i < values.length; i++){
				str += (str == "") ?  values[i].name : ","+values[i].name
			}
			return str;
		},
		doTimeOut: function(i) {
			var self = this;
			setTimeout(function() {
				var selecti =	$('#selectize-'+i+"").selectize({
				    plugins: ['remove_button'],
				    delimiter: ',',
				    persist: false,
				    labelField: 'name',
				    valueField: 'name',
				    create: true,
				    change: function() {
				    	console.log("Test");
				    }
				});

				selecti[0].selectize.on('item_remove', function(value,item) {
					for(var j=0; j < self.options[i].values.length; j++){
						if(value.toLowerCase() == self.options[i].values[j].name.toLowerCase()) {
							self.options[i].values.splice(j,1);
						}
					}
				})

				selecti[0].selectize.on('item_add', function(value,item) {
					self.options[i].values.push({name:value, value:0.00})
				})

				self.disabledInput();

			},100);
		}
	}
});