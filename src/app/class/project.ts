export class Project {
    
        name: string;
        date: Date;
        totalTime: number;
      
        constructor(name: string, date: Date, totalTime: number) {
          this.name = name;
          this.date = new Date(date);
          this.totalTime = totalTime;
        }
      
      }
      
