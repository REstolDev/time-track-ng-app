export class Project {
    
        name: string;
        date: Date;
        totalTime: number;
      
        constructor(name: string, date: string, totalTime: number) {
          this.name = name;
          this.date = new Date(date);
          this.totalTime = totalTime;
        }
      
        startedTime(): string {
          const startedDate : Date = new Date(this.date.getTime() - this.totalTime);
          return startedDate.toLocaleTimeString();
        }
      
        finishedTime(): string {
          return this.date.toLocaleTimeString();
        }
      }
      
