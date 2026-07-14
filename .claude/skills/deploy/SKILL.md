# Skill: /deploy

Envia as alterações da Elis para o GitHub e prepara para deploy no Holos Universit.

## Quando usar

Quando a Elis disser: "deploy", "manda pro github", "publica", "push", "/deploy" ou "envia as alterações".

## O que fazer

### 1. Verificar localização
Confirmar que estamos dentro de `holos-cursos-terapias/holos-universit/`.

### 2. Garantir branch correta
```
git checkout "Lovable-(elis)"
```
Se der erro, avisar a Elis antes de continuar.

### 3. Puxar atualizações antes de enviar
```
git pull origin "Lovable-(elis)"
```
Se houver conflito, parar e descrever o conflito para a Elis decidir.

### 4. Ver o que mudou
```
git status
git diff --stat
```
Mostrar um resumo das alterações (arquivos modificados/adicionados).

### 5. Pedir mensagem de commit
Perguntar: **"O que foi alterado? Descreve em uma frase."**
Usar a resposta como mensagem de commit.

### 6. Enviar
```
git add .
git commit -m "[mensagem da Elis]"
git push origin "Lovable-(elis)"
```

### 7. Confirmar e orientar próximo passo
Após o push bem-sucedido, informar:
> "Enviado. Para ir pra produção, abre um Pull Request no GitHub de `Lovable-(elis)` → `main` e avisa o Lúcio."
> Link: https://github.com/Luciomaier/holos-universit/compare/Lovable-(elis)?expand=1

## Observações
- Nunca fazer push direto na `main`
- Se a branch for renomeada (quando desligarem o Lovable), atualizar o nome nessa skill
- Em caso de conflito com alterações do Lúcio ou Nick, não tentar resolver sozinho — descrever e perguntar
