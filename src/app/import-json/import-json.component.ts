import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-import-json',
    templateUrl: './import-json.component.html',
    styleUrls: ['./import-json.component.css']
})
export class ImportJSONComponent implements OnInit {
    importText = new FormControl('');
    constructor(private http: HttpClient) { }

    ngOnInit(): void {}
    
    import(){
        const data = this.importText.value;
        this.importText.setValue("Das war erfolgreich!");
        setTimeout(() => {
            this.importText.setValue('');
        }, 5*1000);
        this.http.post("http://localhost:4200/api/import", {data: data}).subscribe(err => {
            console.log(err);
        });
    }
    parse(){
        let data = this.importText.value;
        console.log(data);
        if(data == ""){
            return;
        }
        try{
            data = JSON.parse(data);
        }catch(e){
            console.log(e);
        }
        this.importText.setValue(JSON.stringify(data, null, "\t"));
    }
    loadExample(){
        const data = [
            {
                "likes": 0,
                "explanation_id": 0,
                "type_id": 1,
                "url": "http://www.zerowastelifestyle.de/die5rs/",
                "description": "Zero Waste mit den 5 R’s",
                "title": "Das Konzept \"Zero Waste\"",
                "topic_id": 6,
                "english": 0,
                "simple": 0,
                "id": 7
            },
            {
                "likes": "0",
                "explanation_id": "0",
                "type_id": "2",
                "url": "https://www.youtube.com/watch?v=F2oWssOqiWw&amp;list=PLBVy5saB_LC5k_2qRnjXlo8s2bqLWx5lo&amp;index=3",
                "description": "Weniger Müll im Alltag - Wo kann ich anfangen?",
                "title": "Mit Zero Waste starten",
                "topic_id": "6",
                "english": "0",
                "simple": "0",
                "id": "9"
            }
        ];
        this.importText.setValue(JSON.stringify(data, null, "\t"));
    }
}
