import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'raps.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.createTables(db);
        // Inserindo dados padrão
        this.insertDefaultItems(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS users (id integer primary key AUTOINCREMENT NOT NULL, name TEXT,'
      + 'health_condition TEXT, lat TEXT, lng TEXT)']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from users', [])
    .then((data: any) => {
      // Se não existe nenhum registro
      if (data.rows.item(0).qtd === 0) {
        // Criando as tabelas
        db.sqlBatch([
          ['insert into user (name, healt_condition, lat, lng) values (?,?,?,?)', ['João Rabelo', 'diabetico', '-10.611720', '-37.748587']],
          ['insert into user (name, healt_condition, lat, lng) values (?,?,?,?)', ['Rosey Mary', 'hipertenso', '-10.611720', '-37.748587']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de usuários', e));
  }
}
